interface TeacherSocials {
  facebook: string;
  linkedin: string;
  twitter: string;
  email: string;
}
export interface Teacher {
  id: number;
  name: string;
  image: string;
  role: "teacher";
  department: string;
  designation: string;
  experience: string;
  description: string;
  socials: TeacherSocials;
}
