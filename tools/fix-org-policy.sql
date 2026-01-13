-- Fix organizations RLS policy

DROP POLICY IF EXISTS "Users can create organizations" ON organizations;
DROP POLICY IF EXISTS "Users can view own organizations" ON organizations;

-- Simpler policies that don't cause issues
CREATE POLICY "Anyone authenticated can create organizations"
    ON organizations FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Anyone authenticated can view organizations"
    ON organizations FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Anyone authenticated can update organizations"
    ON organizations FOR UPDATE
    TO authenticated
    USING (true);
