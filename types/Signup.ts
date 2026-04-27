export interface IRegisterInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  department: string;
  role: "teacher" | "student" | "admin";
  studen_id?: string;
  designation?: string;
  academicYear?: "1st year" | "2nd year" | "3rd year" | "4th year" | "masters";
  profileImage?: FileList; // Form inputs for image
}
