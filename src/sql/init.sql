CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  google_id TEXT UNIQUE,
  role TEXT CHECK(role IN ('patient','doctor','admin')) DEFAULT 'patient',
  profile JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE, 
  specialization TEXT NOT NULL,
  schedules JSONB DEFAULT '[]'
);

CREATE TABLE appointments( 
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  date_time INT DEFAULT 30,
  symptoms TEXT,
  status TEXT CHECK (status in ('booked', 'completed', 'cancelled')) DEFAULT 'booked',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sessions(
  sid TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);

CREATE INDEX idx_sessions_expire ON sessions(expire);
