-- Allow anonymous users to view sessions by access_code (for taking surveys)
CREATE POLICY "Anonymous can view sessions by access code"
    ON assessment_sessions FOR SELECT
    TO anon
    USING (access_code IS NOT NULL);

-- Allow anonymous users to read questions
CREATE POLICY "Anonymous can view questions"
    ON questions FOR SELECT
    TO anon
    USING (true);

-- Allow anonymous to insert responses
CREATE POLICY "Anonymous can insert responses"
    ON assessment_responses FOR INSERT
    TO anon
    WITH CHECK (true);
