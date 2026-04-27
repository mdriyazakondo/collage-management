interface TUserForm {
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  gender: "male" | "female" | "other";
  contactNo: string;
  department: string;
  role: "student" | "teacher";
  images: string; // Cloudinary URL এখানে সেভ হবে
  student_id?: string;
  academicYear?: string;
  designation?: string;
}
