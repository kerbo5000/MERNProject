import { apiSlice } from '../../app/api/apiSlice'

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints:builder => ({
    getEmployees: builder.query({
      query: (pageNum = 0 ) => `/employees?skip=${pageNum*5}&limit=5`,
      providesTags: (result,error,args) => 
        result 
        ? [...result.map(({_id:id}) => ({type:'Employees',id})),{type:'Employees',id:'LIST'}]
        : {type:'Employees',id:'LIST'}
      
    }),
    getEmployeeById: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: (result,error,args) => 
        [{type:'Employees',id:args._id}]
    }),
    createEmployee: builder.mutation({
      query: info => ({
        url:'/employee',
        method:'POST',
        body:{...info}
      }),
      invalidatesTags: [
        { type: 'Employees', id: "LIST" }
      ]
    }),
    updateEmployeePwd: builder.mutation({
      query: ({employeeId,info}) => ({
        url:`/employees/${employeeId}/password`,
        method:'PATCH',
        body:{...info}
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Employees', id: arg._id }
    ]

    }),
    updateEmployeeUsername: builder.mutation({
      query: ({employeeId,info}) => ({
        url:`/employees/${employeeId}/username`,
        method:'PATCH',
        body:{...info}
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Employees', id: arg._id }
    ]
    })
  })
})
export const {
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
  useGetEmployeesQuery,
  useUpdateEmployeePwdMutation,
  useUpdateEmployeeUsernameMutation
} = employeeApiSlice
