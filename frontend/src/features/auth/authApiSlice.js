import {apiSlice} from '../../app/api/apiSlice'
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (user,pwd,endpoint) => ({
        url: `/auth/${endpoint}`,
        method: 'POST',
        body: {user,pwd}
      })
    }),
    register: builder.mutation({
      query: (credentials)=> ({
        url: '/register',
        method: 'POST',
        body: {...credentials}
      })
    }),
    logout: builder.query({
      query: () => '/logout'
    }),
    updatePwd: builder.mutation({
      query: (userID,oldPassword,newPassword) => ({
        url: `/users/${userID}`,
        method:'PATCH',
        body:{oldPassword,newPassword}
      })
    })

  })
})
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutQuery,
  useUpdatePwdMutation
} = authApiSlice
