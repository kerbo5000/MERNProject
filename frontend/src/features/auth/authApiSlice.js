import { apiSlice } from "../../app/api/apiSlice";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ user, pwd, endpoint }) => ({
        url: `/auth/${endpoint}`,
        method: "POST",
        body: { user, pwd },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url:"/logout",
        method: 'POST'
      })
    })
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApiSlice;
