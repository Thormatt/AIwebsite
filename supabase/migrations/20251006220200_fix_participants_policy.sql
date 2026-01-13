-- Allow anonymous users to create participant records when taking surveys
CREATE POLICY "Anonymous can insert participants"
    ON participants FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anonymous users to view their own participant record
CREATE POLICY "Anonymous can view participants"
    ON participants FOR SELECT
    TO anon
    USING (true);
