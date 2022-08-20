import { apiSlice } from "../../app/api/apiSlice";
import { store } from "../../app/store";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeNotifications: builder.query({
      query: (employeeId) => {
        console.log('bye')
        return `/employees/${employeeId}/notifications`},
      providesTags: (result, error, arg) =>[
        ...result.map(({_id:id}) => ({ type: "Notifications", id }))
      ]
    }),
    deleteEmployeeNotification: builder.mutation({
      query: ({ employeeId, notificationId }) => {
        console.log("hi");
        return {
          url: `/employees/${employeeId}/notifications/${notificationId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Notifications", id: arg._id }],
    }),
  }),
});

export const {
  useGetEmployeeNotificationsQuery,
  useDeleteEmployeeNotificationMutation,
} = notificationApiSlice;
