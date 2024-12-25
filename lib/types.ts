export type User = {
  id: string
  email: string
  role: 'student' | 'tutor'
  approvalStatus?: 'pending' | 'approved' | 'rejected'
  fieldOfStudy?: string
  plansToTeach?: string
}

export type Community = {
  id: string
  name: string
  purpose: string
  details: string
  isPublic: boolean
  memberCount: number
  maxCapacity: number
  creatorId: string
}

export type Course = {
  id: string
  name: string
  description: string
  tutorId: string
  communityId: string
}

export type Homework = {
  id: string
  title: string
  description: string
  dueDate: Date
  courseId: string
  tutorId: string
}

