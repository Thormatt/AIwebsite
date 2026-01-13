-- ============================================================================
-- AI Assessment Platform - Unified Database Schema
-- ============================================================================
-- Purpose: Supports three assessment types:
--   1. Individual AI Maturity Assessment (technical baseline)
--   2. C-Suite Consensus Assessment (executive alignment)
--   3. Organization Pulse Survey (employee sentiment)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. ORGANIZATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    industry TEXT,
    employee_count INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. ASSESSMENT SESSIONS
-- ============================================================================
-- Unified table for all three assessment types
CREATE TABLE IF NOT EXISTS assessment_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('individual', 'consensus', 'pulse')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'archived')),
    is_premium BOOLEAN DEFAULT FALSE,

    -- Session metadata
    title TEXT,
    description TEXT,

    -- Access control
    access_code TEXT UNIQUE, -- For shareable links
    created_by UUID REFERENCES auth.users(id),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_sessions_org ON assessment_sessions(organization_id);
CREATE INDEX IF NOT EXISTS idx_sessions_type ON assessment_sessions(type);
CREATE INDEX IF NOT EXISTS idx_sessions_access_code ON assessment_sessions(access_code);

-- ============================================================================
-- 3. PARTICIPANTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,

    -- Identity (can be anonymous for pulse surveys)
    user_id UUID REFERENCES auth.users(id),
    email TEXT,
    name TEXT,

    -- Segmentation (critical for pulse surveys)
    role TEXT, -- 'ceo', 'cto', 'cfo', 'engineer', 'sales', 'manager', etc.
    department TEXT, -- 'Engineering', 'Sales', 'Marketing', 'Operations', etc.
    level TEXT, -- 'ic', 'manager', 'director', 'executive'
    tenure TEXT, -- '<1year', '1-3years', '3+years'

    -- Status
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,

    -- Metadata
    ip_address INET,
    user_agent TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_participants_session ON participants(session_id);
CREATE INDEX IF NOT EXISTS idx_participants_email ON participants(email);
CREATE INDEX IF NOT EXISTS idx_participants_department ON participants(department);

-- ============================================================================
-- 4. QUESTIONS
-- ============================================================================
-- Master question bank (can be expanded over time)
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL, -- 'data_access', 'governance_clarity', etc.
    text TEXT NOT NULL,

    -- Categorization
    dimension TEXT NOT NULL CHECK (dimension IN ('Data', 'Governance', 'Technical', 'Business', 'Culture')),
    target_audience TEXT[] DEFAULT ARRAY['individual', 'consensus', 'pulse'], -- Which assessments use this

    -- Question configuration
    question_type TEXT DEFAULT 'likert' CHECK (question_type IN ('likert', 'yes_no', 'multiple_choice', 'text')),
    options JSONB, -- For multiple choice: {"choices": ["Option A", "Option B"]}

    -- Display
    order_index INTEGER,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. ASSESSMENT RESPONSES
-- ============================================================================
CREATE TABLE IF NOT EXISTS assessment_responses (
    id BIGSERIAL PRIMARY KEY,
    participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
    question_key TEXT NOT NULL,
    dimension TEXT,

    -- Response data
    response_value TEXT NOT NULL, -- '5' for Likert, 'yes' for yes/no, etc.
    response_text TEXT, -- For open-ended text responses

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_responses_participant ON assessment_responses(participant_id);
CREATE INDEX IF NOT EXISTS idx_responses_question ON assessment_responses(question_key);
CREATE INDEX IF NOT EXISTS idx_responses_dimension ON assessment_responses(dimension);

-- ============================================================================
-- 6. SESSION RESULTS (Computed/Cached)
-- ============================================================================
-- Stores pre-computed results for faster dashboard loading
CREATE TABLE IF NOT EXISTS session_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE UNIQUE,

    -- Overall metrics
    overall_score NUMERIC(5,2),
    completion_rate NUMERIC(5,2),
    total_participants INTEGER,

    -- Dimension scores (JSON for flexibility)
    dimension_scores JSONB, -- {"Data": 72, "Governance": 58, ...}

    -- Segmented analysis (for pulse surveys)
    department_breakdown JSONB,
    level_breakdown JSONB,

    -- Risk metrics (for individual assessments)
    risk_score NUMERIC(5,2),
    risk_level TEXT,

    -- Misalignment metrics (for consensus assessments)
    consensus_variance JSONB,

    -- Timestamps
    computed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_results_session ON session_results(session_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_results ENABLE ROW LEVEL SECURITY;

-- Organizations: Users can only see their own organizations
CREATE POLICY "Users can view own organizations"
    ON organizations FOR SELECT
    USING (
        id IN (
            SELECT DISTINCT organization_id
            FROM assessment_sessions
            WHERE created_by = auth.uid()
        )
    );

CREATE POLICY "Users can create organizations"
    ON organizations FOR INSERT
    WITH CHECK (true);

-- Assessment Sessions: Users can view sessions they created or are invited to
CREATE POLICY "Users can view own sessions"
    ON assessment_sessions FOR SELECT
    USING (
        created_by = auth.uid()
        OR id IN (
            SELECT session_id FROM participants WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create sessions"
    ON assessment_sessions FOR INSERT
    WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update own sessions"
    ON assessment_sessions FOR UPDATE
    USING (created_by = auth.uid());

-- Participants: Users can view participants in sessions they have access to
CREATE POLICY "Users can view participants in their sessions"
    ON participants FOR SELECT
    USING (
        session_id IN (
            SELECT id FROM assessment_sessions
            WHERE created_by = auth.uid()
        )
        OR user_id = auth.uid()
    );

CREATE POLICY "Anyone can insert participant (for anonymous surveys)"
    ON participants FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Participants can update own record"
    ON participants FOR UPDATE
    USING (user_id = auth.uid() OR id = id); -- Allow updates for anonymous participants

-- Questions: Public read access (questions are not sensitive)
CREATE POLICY "Questions are publicly readable"
    ON questions FOR SELECT
    USING (is_active = true);

-- Responses: Users can only view responses for sessions they created or their own responses
CREATE POLICY "Users can view responses for their sessions"
    ON assessment_responses FOR SELECT
    USING (
        participant_id IN (
            SELECT p.id FROM participants p
            JOIN assessment_sessions s ON p.session_id = s.id
            WHERE s.created_by = auth.uid()
        )
        OR participant_id IN (
            SELECT id FROM participants WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Participants can insert own responses"
    ON assessment_responses FOR INSERT
    WITH CHECK (true); -- Validation happens at application level

-- Session Results: Same as sessions
CREATE POLICY "Users can view results for their sessions"
    ON session_results FOR SELECT
    USING (
        session_id IN (
            SELECT id FROM assessment_sessions WHERE created_by = auth.uid()
        )
    );

-- ============================================================================
-- SEED DATA: Pulse Survey Questions
-- ============================================================================
-- Insert the 12 pulse survey questions

INSERT INTO questions (key, text, dimension, target_audience, question_type, order_index) VALUES
-- Data Readiness (2 questions)
('pulse_data_access', 'I have access to the data I need to do my job effectively', 'Data', ARRAY['pulse'], 'likert', 1),
('pulse_data_organized', 'Our data is organized and easy to find', 'Data', ARRAY['pulse'], 'likert', 2),

-- Governance (2 questions)
('pulse_governance_guidelines', 'I have clear guidelines on how to use AI tools with company data', 'Governance', ARRAY['pulse'], 'likert', 3),
('pulse_governance_confidence', 'I feel confident I am following the right policies when using AI', 'Governance', ARRAY['pulse'], 'likert', 4),

-- Technical Capability (2 questions)
('pulse_tech_tools', 'I have access to the AI tools I need', 'Technical', ARRAY['pulse'], 'yes_no', 5),
('pulse_tech_support', 'Our IT systems support AI adoption', 'Technical', ARRAY['pulse'], 'likert', 6),

-- Business Alignment (3 questions)
('pulse_business_strategy', 'Leadership has communicated a clear AI strategy', 'Business', ARRAY['pulse'], 'likert', 7),
('pulse_business_impact', 'I understand how AI will impact my role', 'Business', ARRAY['pulse'], 'likert', 8),
('pulse_business_goals', 'I see how AI initiatives connect to business goals', 'Business', ARRAY['pulse'], 'likert', 9),

-- Culture (3 questions)
('pulse_culture_prepared', 'I feel prepared for AI-driven changes', 'Culture', ARRAY['pulse'], 'likert', 10),
('pulse_culture_openness', 'My team is open to experimenting with AI', 'Culture', ARRAY['pulse'], 'likert', 11),
('pulse_culture_safety', 'I can speak up if I have concerns about AI use', 'Culture', ARRAY['pulse'], 'likert', 12)
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to calculate dimension scores for a session
CREATE OR REPLACE FUNCTION calculate_dimension_scores(session_uuid UUID)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_object_agg(dimension, avg_score)
    INTO result
    FROM (
        SELECT
            r.dimension,
            ROUND(AVG(r.response_value::numeric), 2) as avg_score
        FROM assessment_responses r
        JOIN participants p ON r.participant_id = p.id
        WHERE p.session_id = session_uuid
        AND r.dimension IS NOT NULL
        GROUP BY r.dimension
    ) scores;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to get completion rate for a session
CREATE OR REPLACE FUNCTION get_completion_rate(session_uuid UUID)
RETURNS NUMERIC AS $$
DECLARE
    total_participants INTEGER;
    completed_participants INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_participants
    FROM participants
    WHERE session_id = session_uuid;

    SELECT COUNT(*) INTO completed_participants
    FROM participants
    WHERE session_id = session_uuid
    AND completed_at IS NOT NULL;

    IF total_participants = 0 THEN
        RETURN 0;
    END IF;

    RETURN ROUND((completed_participants::numeric / total_participants::numeric) * 100, 2);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- VIEWS FOR REPORTING
-- ============================================================================

-- View: Session overview with key metrics
CREATE OR REPLACE VIEW session_overview AS
SELECT
    s.id,
    s.organization_id,
    s.type,
    s.status,
    s.title,
    s.created_at,
    o.name as organization_name,
    COUNT(DISTINCT p.id) as total_participants,
    COUNT(DISTINCT CASE WHEN p.completed_at IS NOT NULL THEN p.id END) as completed_participants,
    get_completion_rate(s.id) as completion_rate
FROM assessment_sessions s
LEFT JOIN organizations o ON s.organization_id = o.id
LEFT JOIN participants p ON s.id = p.session_id
GROUP BY s.id, s.organization_id, s.type, s.status, s.title, s.created_at, o.name;

-- ============================================================================
-- MIGRATION NOTES
-- ============================================================================
-- To apply this schema:
-- 1. Copy this entire file
-- 2. Go to Supabase Dashboard → SQL Editor
-- 3. Paste and run
-- 4. Verify tables created in Table Editor
-- ============================================================================
