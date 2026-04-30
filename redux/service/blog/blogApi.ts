import { TBlog } from "@/types/blog";
import { TApiResponse } from "@/types/users";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/",
    credentials: "include",
  }),
  tagTypes: ["blogs"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query<TApiResponse<TBlog[]>, string>({
      query: (pathName) => ({
        url: `blogs${pathName}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    createBlog: builder.mutation<TApiResponse<TBlog>, TBlog>({
      query: (data) => ({
        url: "blog",
        method: "POST",

        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const { useGetAllBlogsQuery, useCreateBlogMutation } = blogApi;
