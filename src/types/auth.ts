export interface StudentSignUpData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  currentEducation: string;
  englishLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
  toeflScore?: number;
  ieltsScore?: number;
  targetSchool: string;
  targetMajor: string;
}

export interface MentorApplicationData {
  email: string;
  firstName: string;
  lastName: string;
  school: string;
  major: string;
  primaryLanguage: string;
  bio: string;
  phoneNumber: string;
  linkedin: string;
}