import {apiSlice} from '../../app/api/apiSlice'

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints:builder => ({
    getNews: builder.query({
      query: (pageNum) => `/news?skip=${pageNum}&limit=5`,
    }),
    getNewsById: builder.query({
      query: (newsId) => `/news/${newsId}`
    }),
    createNews: builder.mutation({
      query: (info) => ({
        url:'/news',
        method:'POST',
        body:{...info}
      })
    }),
    updateNews: builder.mutation({
      query: (newsId,info) => ({
        url:`/news/${newsId}`,
        method:'PATCH',
        body:{...info}
      })
    }),
    likeNews: builder.mutation({
      query: (newsId,like) => ({
        url:`/news/${newsId}/likes/${like}`,
        method:'PATCH'
      })
    }),
    commentNews: builder.mutation({
      query: (newsId,comment) => ({
        url: `/news/${newsId}/comments`,
        method:'POST',
        body:{comment}
      })
    }),

  })
})
export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useLikeNewsMutation,
  useCommentNewsMutation
} = newsApiSlice
