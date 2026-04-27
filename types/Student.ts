/* 🔹 Student Types Definition */
interface StudentSocials {
  facebook: string;
  linkedin: string;
  github: string; // স্টুডেন্টদের জন্য GitHub বেশি প্রয়োজনীয়
  email: string;
}

export interface Student {
  id: number;
  name: string;
  image: string;
  role: "student";
  batch: string;
  major: string;
  idNumber: string;
  achievements: string;
  description: string;
  socials: StudentSocials;
}
