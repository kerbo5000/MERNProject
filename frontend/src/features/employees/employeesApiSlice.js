import { apiSlice } from "../../app/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";


const employeesAdapter = createEntityAdapter({
  selectId: (employee) => employee._id,
});

const initialState = employeesAdapter.getInitialState();

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => `/employees`,
      transformResponse: (response) => 
        employeesAdapter.setAll(initialState,response),
      providesTags: (result, error, args) =>
        result
          ? [
              ...result.map(({ _id: id }) => ({ type: "Employees", id })),
              { type: "Employees", id: "LIST" },
            ]
          : { type: "Employees", id: "LIST" },
    }),
    getEmployeeById: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: (result, error, args) => [
        { type: "Employees", id: args._id },
      ],
    }),
    createEmployee: builder.mutation({
      query: (info) => ({
        url: "/employee",
        method: "POST",
        body: { ...info },
      }),
      invalidatesTags: [{ type: "Employees", id: "LIST" }],
    }),
    updateEmployeePwd: builder.mutation({
      query: ({ employeeId, info }) => ({
        url: `/employees/${employeeId}/password`,
        method: "PATCH",
        body: { ...info },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Employees", id: arg._id },
      ],
    }),
    updateEmployeeUsername: builder.mutation({
      query: ({ employeeId, info }) => ({
        url: `/employees/${employeeId}/username`,
        method: "PATCH",
        body: { ...info },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Employees", id: arg._id },
      ],
    }),
    deleteEmployee: builder.mutation({
      query: (employeeId) => ({
        url: `/news/${employeeId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Employees", id: arg._id }],
    }),
  }),
});

export const selectEmployeesResult = employeeApiSlice.endpoints.getAllEmployees.select();

const selectEmployeesData = createSelector(
  selectEmployeesResult,
  (employeesResult) => employeesResult.data
);

export const {
  selectAll: selectAllEmployees,
  selectById: selectEmployeeById,
  selectIds: selectEmployeesIds,
} = employeesAdapter.getSelectors((state) => selectEmployeesData(state) ?? initialState);

export const {
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
  useGetAllEmployeesQuery,
  useUpdateEmployeePwdMutation,
  useUpdateEmployeeUsernameMutation,
  useDeleteEmployeeMutation
} = employeeApiSlice;
