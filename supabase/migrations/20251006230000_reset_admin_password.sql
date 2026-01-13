-- Reset password for admin user
UPDATE auth.users
SET encrypted_password = crypt('thor2025!', gen_salt('bf'))
WHERE email = 'thormatt@gmail.com';
