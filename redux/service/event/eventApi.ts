import { TEvents } from "@/types/event";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/",
    credentials: "include",
  }),
  tagTypes: ["events"],
  endpoints: (builder) => ({
    getAllEvents: builder.query<TApiResponse<TEvents[]>, string>({
      query: (pathName) => ({
        url: `events${pathName}`,
        method: "GET",
      }),
      providesTags: ["events"],
    }),
    getEventById: builder.query<TApiResponse<TEvents>, string>({
      query: (id) => ({
        url: `events/${id}`,
        method: "GET",
      }),
      providesTags: ["events"],
    }),
    createEvent: builder.mutation<TApiResponse<TEvents>, TEvents>({
      query: (data) => ({
        url: "events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["events"],
    }),

    deleteEvent: builder.mutation<TApiResponse<null>, string>({
      query: (id) => ({
        url: `events/${id}`,

        method: "DELETE",
      }),
      invalidatesTags: ["events"],
    }),
    updateEvent: builder.mutation<
      TApiResponse<TEvents>,
      { data: TEvents; id: string }
    >({
      query: ({ data, id }) => ({
        url: `events/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useCreateEventMutation,
  useGetEventByIdQuery,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = eventApi;
