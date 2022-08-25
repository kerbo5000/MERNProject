import { apiSlice } from "../../app/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";


const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
});

const initialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `/users`,
      transformResponse: (response) => 
        usersAdapter.setAll(initialState,response),
      providesTags: (result, error, args) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "Users", id })),
              { type: "Users", id: "LIST" },
            ]
          : { type: "Users", id: "LIST" },
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, args) => [
        { type: "Users", id: args._id },
      ],
    }),
    updateUserPwd: builder.mutation({
      query: ({ userId, info }) => ({
        url: `/users/${userId}/password`,
        method: "PATCH",
        body: { ...info },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Users", id: arg._id },
      ],
    }),
    updateUserUsername: builder.mutation({
      query: ({ userId, info }) => ({
        url: `/users/${userId}/username`,
        method: "PATCH",
        body: { ...info },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Users", id: arg._id },
      ],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Users", id: arg._id }],
    }),
  }),
});

export const selectUsersResult = userApiSlice.endpoints.getAllUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);

export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateUserPwdMutation,
  useUpdateUserUsernameMutation,
  useDeleteUserMutation
} = userApiSlice;
