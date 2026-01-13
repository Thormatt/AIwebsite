-- Add tables for consensus and individual assessment responses
-- These complement the existing assessment_sessions table

-- Consensus assessment responses (for C-suite alignment assessment)
CREATE TABLE IF NOT EXISTS consensus_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    respondent_name TEXT NOT NULL,
    respondent_title TEXT NOT NULL,
    respondent_role TEXT, -- CEO, CFO, CTO, etc.
    respondent_company TEXT,
    respondent_email TEXT,
    responses JSONB NOT NULL, -- All question responses as JSON
    results JSONB, -- Calculated scores and analysis
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual assessment responses (for CEO/VP technical assessment)
CREATE TABLE IF NOT EXISTS individual_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    respondent_name TEXT,
    respondent_title TEXT,
    respondent_company TEXT,
    respondent_email TEXT,
    responses JSONB NOT NULL, -- All 100+ question responses as JSON
    results JSONB, -- Radar chart data, recommendations, etc.
    industry TEXT,
    company_size TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for consensus_responses
ALTER TABLE consensus_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view consensus responses"
    ON consensus_responses FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Anonymous can insert consensus responses"
    ON consensus_responses FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Authenticated can insert consensus responses"
    ON consensus_responses FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- RLS Policies for individual_responses
ALTER TABLE individual_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view individual responses"
    ON individual_responses FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Anonymous can insert individual responses"
    ON individual_responses FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "Authenticated can insert individual responses"
    ON individual_responses FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_consensus_responses_session ON consensus_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_individual_responses_session ON individual_responses(session_id);
