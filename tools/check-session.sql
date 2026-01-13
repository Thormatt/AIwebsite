-- Check if the session exists
SELECT id, type, status, access_code, title, created_at 
FROM assessment_sessions 
WHERE access_code = 'pulse_kp3f5szx076s7j5ih1';

-- Also check all sessions
SELECT id, type, status, access_code, title 
FROM assessment_sessions 
ORDER BY created_at DESC 
LIMIT 5;
