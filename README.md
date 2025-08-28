📘 Hospital Appointment Scheduler – GitHub Documentation
(First commit – Table of Contents + Overview only)
📑 Table of Contents

    Overview
    Features
    High-level Architecture
    Micro-service Road-map
    Tech Stack
    Quick Start (local Docker)
    API Reference (TBD)
    Authentication Flow (TBD)
    Database Schema (TBD)
    Deployment (TBD)
    Contributing (TBD)

🏥 Overview
The Hospital Appointment Scheduler is a green-field, cloud-ready platform that lets patients
find the nearest available appointment with a doctor of a chosen specialization in real-time.
It balances doctor availability, current patient load, and configurable appointment duration.
Core Use-cases

    Patient ➜ “I have chest pain – next cardiology slot, please.”
    Doctor ➜ “Update my weekly schedule in 30 s.”
    Admin ➜ “Spin up another Appointment-MS replica – load is spiking.”

Non-functional Goals

    Zero-downtime horizontal scaling
    Session-based auth backed by Redis (JWT-less)
    OAuth 2.0 (Google) implemented from scratch for learning purposes
    Clean hexagonal layers ready to be sliced into four independent micro-services
    One-command local environment via Docker Compose

✅ Features (implemented incrementally)
Table
Copy
#	Feature	Status
1	Patient registration & login (email + password)	🔜
2	Google OAuth 2.0 (manual implementation)	🔜
3	Doctor profile & schedule management	🔜
4	Intelligent slot finder (PostgreSQL + Redis)	🔜
5	Session store in Redis	🔜
6	Health-check & metrics endpoints	🔜
7	Auth-MS, Patient-MS, Doctor-MS, Appointment-MS split	🔜
🏗️ High-level Architecture
Text
Copy


🧩 Micro-service Road-map
Table
Copy
Service	Responsibility	Port	DB
Auth-MS	Registration, login, OAuth handshake, sessions	5001	Redis only
Patient-MS	Patient profile CRUD	5002	Postgres patients
Doctor-MS	Doctor profile + schedule CRUD	5003	Postgres doctors, schedules
Appointment-MS	Slot search, booking, cancellation	5004	Postgres appointments, Redis cache
🧰 Tech Stack

    Node.js 20 + Express 4
    PostgreSQL 15 (via Sequelize ORM)
    Redis 7 (sessions + cache)
    Docker & Docker Compose
    React 18 + Vite + TailwindCSS 3 (UI)
    bcrypt for password hashing
    crypto (built-in) for signing/verifying OAuth state & session IDs
    nodemailer for password-reset flow (later)
