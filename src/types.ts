export interface User {
  id: string;
  name: string;
  university: string;
  year: number;
  major: string;
}

export interface Habit {
  id: string;
  title: string;
  category: 'academic' | 'wellness' | 'finance' | 'career';
  completed: boolean;
  streak: number;
}

export interface MoodEntry {
  id: string;
  timestamp: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'awful';
  note?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface AcademicTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  type: 'assignment' | 'exam' | 'study' | 'goal';
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'internship' | 'part-time' | 'freelance' | 'remote' | 'entry-level' | 'scholarship' | 'flexible';
  description: string;
  eligibility: string;
  category: string;
  applicationUrl?: string;
}

export interface CVData {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
  };
  profileSummary: string;
  education: {
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description?: string;
  }[];
  skills: string[];
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
  }[];
  volunteerWork: {
    id: string;
    organization: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  references?: {
    id: string;
    name: string;
    company: string;
    contact: string;
  }[];
  lastSaved: string;
  progress: number;
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: 'academic' | 'wellness' | 'finance' | 'career' | 'social';
  image: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  isPWD?: boolean;
}

export interface TimetableEntry {
  id: string;
  courseTitle: string;
  time: string;
  venue: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  isFree?: boolean;
}

export interface StudentJob extends JobOpportunity {
  estimatedHours: string;
  isUniAbuja?: boolean;
  category: 'on-campus' | 'off-campus' | 'remote' | 'skill-based';
}

export interface AcademicEvent {
  id: string;
  title: string;
  date: string;
  type: 'holiday' | 'exam' | 'registration' | 'deadline' | 'other';
  description?: string;
}
