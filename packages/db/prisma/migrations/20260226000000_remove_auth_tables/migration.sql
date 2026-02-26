-- Drop auth-related tables (users, sessions, verifications)
-- These are no longer needed as DishCover MVP does not require user accounts.

DROP TABLE IF EXISTS "sessions";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "verifications";
