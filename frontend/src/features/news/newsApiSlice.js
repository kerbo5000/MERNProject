import {apiSlice} from '../../app/api/apiSlice'

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints:builder => ({
    getNews: builder.query({
      query: ({pageNum,liked}) => `/news?skip=${pageNum}&limit=5${liked ? `&liked=${liked}`:''}`
    }),
    getNewsSearch: builder.query({
      query: ({pageNum,search,liked}) => `/news?skip=${pageNum}&limit=5&title=${search}&username=${search}&body=${search}${liked ? `&liked=${liked}`:''}`
    }),
    getNewsById: builder.query({
      query: newsId => `/news/${newsId}`
    }),
    createNews: builder.mutation({
      query: info => ({
        url:'/news',
        method:'POST',
        body:{...info}
      })
    }),
    updateNews: builder.mutation({
      query: ({newsId,info}) => ({
        url:`/news/${newsId}`,
        method:'PATCH',
        body:{...info}
      })
    }),
    likeNews: builder.mutation({
      query: ({newsId,like}) => ({
        url:`/news/${newsId}/likes/${like}`,
        method:'PATCH'
      })
    }),
    commentNews: builder.mutation({
      query: ({newsId,comment}) => ({
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
  useCommentNewsMutation,
  useGetNewsSearchQuery
} = newsApiSlice
