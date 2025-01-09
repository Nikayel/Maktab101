/*
  # Initial Schema for Afghan Girls Scholarship Platform

  1. New Tables
    - `users`
      - Base table for all users (students and mentors)
      - Contains common user information and authentication
    - `students`
      - Profile information for student users
      - Links to users and mentors
    - `mentors`
      - Profile information for mentor users
      - Tracks mentor capacity and expertise
    - `mentorship_sessions`
      - Records of mentoring sessions
      - Links students and mentors
    - `scholarships`
      - Available scholarship opportunities
      - Includes deadlines and requirements

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated access
    - Separate policies for students and mentors

  3. Relationships
    - Users → Students/Mentors (one-to-one)
    - Students → Mentors (many-to-one)
    - Sessions → Students/Mentors (many-to-many)
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'mentor');
CREATE TYPE education_level AS ENUM ('high_school', 'undergraduate', 'graduate');

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role user_role NOT NULL,
  country text NOT NULL,
  language text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create mentors table
CREATE TABLE mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  university text NOT NULL,
  program text NOT NULL,
  scholarship_received text NOT NULL,
  expertise text[] NOT NULL,
  availability jsonb NOT NULL,
  student_count int DEFAULT 0 CHECK (student_count <= 20),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_mentor_user UNIQUE (user_id)
);

-- Create students table
CREATE TABLE students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  mentor_id uuid REFERENCES mentors(id) ON DELETE SET NULL,
  education_level education_level NOT NULL,
  interests text[] NOT NULL,
  goals text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT unique_student_user UNIQUE (user_id)
);

-- Create mentorship_sessions table
CREATE TABLE mentorship_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  mentor_id uuid REFERENCES mentors(id) ON DELETE CASCADE,
  date timestamptz NOT NULL,
  duration int NOT NULL CHECK (duration > 0),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create scholarships table
CREATE TABLE scholarships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  eligibility text NOT NULL,
  deadline date NOT NULL,
  link text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Students policies
CREATE POLICY "Students can read own profile"
  ON students
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM students WHERE id = students.id
      UNION
      SELECT user_id FROM mentors WHERE id = students.mentor_id
    )
  );

CREATE POLICY "Students can update own profile"
  ON students
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Mentors policies
CREATE POLICY "Mentors can read own profile"
  ON mentors
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM mentors WHERE id = mentors.id
      UNION
      SELECT user_id FROM students WHERE mentor_id = mentors.id
    )
  );

CREATE POLICY "Mentors can update own profile"
  ON mentors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Mentorship sessions policies
CREATE POLICY "Users can read own sessions"
  ON mentorship_sessions
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM students WHERE id = mentorship_sessions.student_id
      UNION
      SELECT user_id FROM mentors WHERE id = mentorship_sessions.mentor_id
    )
  );

-- Scholarships policies
CREATE POLICY "Anyone can read scholarships"
  ON scholarships
  FOR SELECT
  TO authenticated
  USING (true);

-- Create functions
CREATE OR REPLACE FUNCTION check_mentor_capacity()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT student_count 
    FROM mentors 
    WHERE id = NEW.mentor_id
  ) >= 20 THEN
    RAISE EXCEPTION 'Mentor has reached maximum capacity of 20 students';
  END IF;
  
  UPDATE mentors 
  SET student_count = student_count + 1 
  WHERE id = NEW.mentor_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER check_mentor_capacity_trigger
  BEFORE INSERT ON students
  FOR EACH ROW
  WHEN (NEW.mentor_id IS NOT NULL)
  EXECUTE FUNCTION check_mentor_capacity();

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_students_mentor ON students(mentor_id);
CREATE INDEX idx_sessions_student ON mentorship_sessions(student_id);
CREATE INDEX idx_sessions_mentor ON mentorship_sessions(mentor_id);
CREATE INDEX idx_scholarships_deadline ON scholarships(deadline);