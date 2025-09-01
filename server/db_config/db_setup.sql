-- User Table: Stores login information and roles for both patients and admins.
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('patient','admin')) DEFAULT 'patient',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profiles table: Stores additional user details, separating them from auth data 
CREATE TABLE profiles(
  profile_id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone_number VARCHAR(20)
);

-- Specializations table: Stores doctor's Specializations
CREATE TABLE specializations(
  spec_id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

-- Doctors table: Stores doctor information and their general availability
CREATE TABLE doctors(
  doctor_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  spec_id INTEGER REFERENCES specializations(spec_id),
  availability JSONB
  -- Example availability:
  -- {"Monday": {"start": "09:00", "end": "21:00"}, ...}
  max_appointments INTEGER DEFAULT 10, -- Max daily appointments 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointment table: Stores core table linking patients, doctors, and time slots 
CREATE TABLE appointments(
  appointment_id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL REFERENCES users(user_id),
  doctor_id INTEGER NOT NULL REFERENCES doctors(doctor_id),
  appointment_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  symptoms TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  -- This unique constraint is critical to preven a doctor form being double booked 
  UNIQUE(doctor_id, appointment_time)
);

