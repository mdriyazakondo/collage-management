import { createApi } from "@reduxjs/toolkit/query/react";
import {
  TCreateUserPayload,
  TLoginPayload,
  TUpdateUserPayload,
  TUpdateUserRolePayload,
  TUser,
} from "@/types/users";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/user/",
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<TApiResponse<TUser[]>, string>({
      query: (pathName) => ({
        url: `all_user${pathName}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getTeacherRole: builder.query<TApiResponse<TUser[]>, string>({
      query: (role) => ({
        url: `role_user?role=${role}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    getRoleByUser: builder.query<
      TApiResponse<{ role: TUser["role"] }>,
      { email: string }
    >({
      query: ({ email }) => ({
        url: `auth/users-role/${email}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    createUser: builder.mutation<TApiResponse<TUser>, TCreateUserPayload>({
      query: (data) => ({
        url: "sign_up",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    loginUser: builder.mutation<
      TApiResponse<{ token: string; user: TUser }>,
      TLoginPayload
    >({
      query: (data) => ({
        url: "sign_in",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation<TApiResponse<TUser>, TUpdateUserPayload>({
      query: (data) => ({
        url: "auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    logoutUser: builder.mutation<TApiResponse<null>, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),

    updateUserRole: builder.mutation<
      TApiResponse<TUser>,
      TUpdateUserRolePayload
    >({
      query: ({ role, userId }) => ({
        url: "auth/update-role",
        method: "PUT",
        body: { userId, role },
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation<TApiResponse<null>, string>({
      query: (id: string) => ({
        url: `auth/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetRoleByUserQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetTeacherRoleQuery,
} = userApi;
