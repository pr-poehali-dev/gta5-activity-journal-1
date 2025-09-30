-- Create users table with roles
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'player',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create player_activity table
CREATE TABLE IF NOT EXISTS player_activity (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    status VARCHAR(50) NOT NULL,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    duration_minutes INTEGER
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_player_activity_user_id ON player_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_player_activity_status ON player_activity(status);
CREATE INDEX IF NOT EXISTS idx_player_activity_started_at ON player_activity(started_at);

-- Insert super admin user (password: admin123)
INSERT INTO users (username, password_hash, display_name, role) 
VALUES ('superadmin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Супер Админ', 'superadmin')
ON CONFLICT (username) DO NOTHING;

-- Insert demo player
INSERT INTO users (username, password_hash, display_name, role) 
VALUES ('player1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Игрок 1', 'player')
ON CONFLICT (username) DO NOTHING;

-- Insert some demo activity data
INSERT INTO player_activity (user_id, status, started_at, ended_at, duration_minutes)
SELECT 
    2,
    CASE WHEN random() < 0.33 THEN 'online' WHEN random() < 0.66 THEN 'afk' ELSE 'offline' END,
    CURRENT_TIMESTAMP - (interval '1 day' * random() * 30),
    CURRENT_TIMESTAMP - (interval '1 day' * random() * 29),
    (random() * 180 + 10)::INTEGER
FROM generate_series(1, 50);