export type TUser = {
  _id?: string; // backend থেকে আসলে
  firstName: string;
  lastName?: string;
  email: string;
  student_id?: string;
  images: string;
  password?: string; // response এ সাধারণত থাকে না
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  department: string;
  role: "teacher" | "student" | "admin";
  designation?: string;
  academicYear?: "1st year" | "2nd year" | "3rd year" | "4th year" | "masters";
  createdAt?: string;
  updatedAt?: string;
};

export type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
export type TUpdateUserRolePayload = {
  userId: string;
  role: TUser["role"];
};
export type TUpdateUserPayload = Partial<
  Omit<TUser, "_id" | "email" | "role" | "password">
>;
export type TLoginPayload = {
  email: string;
  password: string;
};
export type TCreateUserPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  department: string;
  role: "teacher" | "student" | "admin";
  student_id?: string;
  designation?: string;
  academicYear?: TUser["academicYear"];
  images: string;
};

export type TUserListResponse = {
  success: boolean;
  message: string;
  data: TUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
};
export type TGetUsersQuery = {
  search?: string;
  role?: string;
  page?: number;
  limit?: number;
};
