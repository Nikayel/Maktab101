import { supabase } from './supabaseClient';

export async function rateTutor(studentId: string, tutorId: string, rating: number, comment: string) {
  const { data, error } = await supabase
    .from('tutor_ratings')
    .insert({ student_id: studentId, tutor_id: tutorId, rating, comment });

  if (error) throw error;

  // Update tutor's average rating
  await updateTutorAverageRating(tutorId);

  return data;
}

async function updateTutorAverageRating(tutorId: string) {
  const { data, error } = await supabase
    .rpc('calculate_average_rating', { tutor_id: tutorId });

  if (error) throw error;

  return data;
}

export async function awardPoints(studentId: string, points: number) {
  const { data, error } = await supabase
    .rpc('award_points', { student_id: studentId, points_to_award: points });

  if (error) throw error;

  return data;
}

export async function addCertification(studentId: string, courseId: string, pointsEarned: number) {
  const { data, error } = await supabase
    .from('certifications')
    .insert({ student_id: studentId, course_id: courseId, points_earned: pointsEarned });

  if (error) throw error;

  // Award points to the student
  await awardPoints(studentId, pointsEarned);

  return data;
}

// SQL functions to be created in Supabase:

/*
create or replace function calculate_average_rating(tutor_id uuid)
returns void as $$
declare
  avg_rating float;
begin
  select avg(rating) into avg_rating
  from tutor_ratings
  where tutor_id = $1;

  update profiles
  set average_rating = avg_rating
  where id = $1;
end;
$$ language plpgsql;

create or replace function award_points(student_id uuid, points_to_award integer)
returns void as $$
begin
  update profiles
  set points = points + points_to_award
  where id = student_id;
end;
$$ language plpgsql;
*/

