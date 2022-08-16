import { apiSlice } from "../../app/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const newsAdapter = createEntityAdapter({
  selectId: (news) => news._id,
});

const initialState = newsAdapter.getInitialState();

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: () => `/news`,
      transformResponse: (response) =>
        newsAdapter.setAll(initialState, response),
      providesTags: (result, error, args) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "News", id })),
              { type: "News", id: "LIST" },
            ]
          : { type: "News", id: "LIST" },
    }),
    getNewsPagination: builder.query({
      query: (pageNum = 0) => `/news?skip=${pageNum * 5}&limit=5`,
      providesTags: (result, error, args) => [
        ...result.map(({ _id: id }) => ({ type: "News", id })),
      ],
    }),
    getLikedNews: builder.query({
      query: ({ pageNum, userId }) =>
        `/news?skip=${pageNum * 5}&limit=5&liked=${userId}`,
      providesTags: (result, error, args) => [
        ...result.map(({ _id: id }) => ({ type: "News", id })),
      ],
    }),
    getNewsSearch: builder.query({
      query: (search) =>
        `/news/search?title=${search}&username=${search}&body=${search}`,
      providesTags: (result, error, args) => [
        ...result.map(({ _id: id }) => ({ type: "News", id })),
      ],
    }),
    getNewsByEmployee: builder.query({
      query: (employeeId) => `/news?employee=${employeeId}`,
      providesTags: (result, error, args) => [
        ...result.map(({ _id: id }) => ({ type: "News", id })),
      ],
    }),
    getSingleNews: builder.query({
      query: (id) => `/news/${id}`,
      providesTags: (result, error, args) => [{ type: "News", id: args._id }],
    }),
    createNews: builder.mutation({
      query: (info) => ({
        url: "/news",
        method: "POST",
        body: { ...info },
      }),
      invalidatesTags: [{ type: "News", id: "LIST" }],
    }),
    updateNews: builder.mutation({
      query: ({ newsId, info }) => ({
        url: `/news/${newsId}`,
        method: "PATCH",
        body: { ...info },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "News", id: arg._id }],
    }),
    likeNews: builder.mutation({
      query: ({ newsId, like }) => ({
        url: `/news/${newsId}/likes/${like}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "News", id: arg._id }],
    }),
    commentNews: builder.mutation({
      query: ({ newsId, comment }) => ({
        url: `/news/${newsId}/comments`,
        method: "POST",
        body: { comment },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "News", id: arg._id }],
    }),
    deleteNews: builder.mutation({
      query: (newsId) => ({
        url: `/news/${newsId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "News", id: arg._id }],
    }),
  }),
});

export const selectNewsResult = newsApiSlice.endpoints.getAllNews.select();

const selectNewsData = createSelector(
  selectNewsResult,
  (newsResult) => newsResult.data
);

export const {
  selectAll: selectAllNews,
  selectById: selectNewsById,
  selectIds: selectNewsIds,
} = newsAdapter.getSelectors((state) => selectNewsData(state) ?? initialState);

export const {
  useGetNewsPaginationQuery,
  useGetLikedNewsQuery,
  useCommentNewsMutation,
  useCreateNewsMutation,
  useGetNewsSearchQuery,
  useUpdateNewsMutation,
  useLikeNewsMutation,
  useGetSingleNewsQuery,
  useGetNewsByEmployeeQuery,
  useGetAllNewsQuery,
  useDeleteNewsMutation,
} = newsApiSlice;
