import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sqghnwxxxfckqsjffndg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZ2hud3h4eGZja3FzamZmbmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2Mzc3OTEsImV4cCI6MjA1MDIxMzc5MX0.uwlQUncVGtWGgka_O5XIFr7rsSkEVG4EnKoEfbCjy-A';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function setupDatabase() {
  // Update profiles table
  const { error: profilesError } = await supabase.rpc('update_profiles_table');
  if (profilesError) console.error('Error updating profiles table:', profilesError);

  // Create tutor_ratings table
  const { error: ratingsError } = await supabase.rpc('create_tutor_ratings_table');
  if (ratingsError) console.error('Error creating tutor_ratings table:', ratingsError);

  // Create certifications table
  const { error: certificationsError } = await supabase.rpc('create_certifications_table');
  if (certificationsError) console.error('Error creating certifications table:', certificationsError);

  console.log('Database setup complete');
}

// SQL functions to be created in Supabase:

/*
create or replace function update_profiles_table()
returns void as $$
begin
  alter table profiles
  add column if not exists points integer default 0,
  add column if not exists average_rating float default 0;
end;
$$ language plpgsql;

create or replace function create_tutor_ratings_table()
returns void as $$
begin
  create table if not exists tutor_ratings (
    id uuid primary key default uuid_generate_v4(),
    student_id uuid references profiles(id),
    tutor_id uuid references profiles(id),
    rating integer check (rating >= 1 and rating <= 5),
    comment text,
    created_at timestamp with time zone default now()
  );
end;
$$ language plpgsql;

create or replace function create_certifications_table()
returns void as $$
begin
  create table if not exists certifications (
    id uuid primary key default uuid_generate_v4(),
    student_id uuid references profiles(id),
    course_id uuid references courses(id),
    certification_date timestamp with time zone default now(),
    points_earned integer default 0
  );
end;
$$ language plpgsql;
*/

