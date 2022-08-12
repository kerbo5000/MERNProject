import { apiSlice } from '../../app/api/apiSlice'

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints:builder => ({
    getNews: builder.query({
      query: (pageNum = 0 ) => `/news?skip=${pageNum*5}&limit=5`,
      providesTags: (result,error,args) => 
        result 
        ? [...result.map(({_id:id}) => ({type:'News',id})),{type:'News',id:'LIST'}]
        : {type:'News',id:'LIST'}
      
    }),
    getLikedNews: builder.query({
      query: ({pageNum,userId}) =>  `/news?skip=${pageNum*5}&limit=5&liked=${userId}`,
      providesTags: (result,error,args) => 
        [...result.map(({_id:id}) => ({type:'News',id}))]
      
    }),
    getNewsSearch: builder.query({
      query: (search) => `/news/search?title=${search}&username=${search}&body=${search}`,
      providesTags: (result,error,args) => 
        [...result.map(({_id:id}) => ({type:'News',id}))]
    }),
    getNewsByEmployee: builder.query({
      query: (employeeId) => `/news?employee=${employeeId}`,
      providesTags: (result,error,args) => 
        [...result.map(({_id:id}) => ({type:'News',id}))]
    }),
    getSingleNews: builder.query({
      query: (id) => `/news/${id}`,
      providesTags: (result,error,args) => 
        [{type:'News',id:args._id}]
    }),
    createNews: builder.mutation({
      query: info => ({
        url:'/news',
        method:'POST',
        body:{...info}
      }),
      invalidatesTags: [
        { type: 'News', id: "LIST" }
      ]
    }),
    updateNews: builder.mutation({
      query: ({newsId,info}) => ({
        url:`/news/${newsId}`,
        method:'PATCH',
        body:{...info}
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'News', id: arg._id }
    ]

    }),
    likeNews: builder.mutation({
      query: ({newsId,like}) => ({
        url:`/news/${newsId}/likes/${like}`,
        method:'PATCH'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'News', id: arg._id }
    ]
    }),
    commentNews: builder.mutation({
      query: ({newsId,comment}) => ({
        url: `/news/${newsId}/comments`,
        method:'POST',
        body:{comment}
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'News', id: arg._id }
    ]
    }),

  })
})
export const {
  useGetNewsQuery,
  useGetLikedNewsQuery,
  useCommentNewsMutation,
  useCreateNewsMutation,
  useGetNewsSearchQuery,
  useUpdateNewsMutation,
  useLikeNewsMutation,
  useGetSingleNewsQuery,
  useGetNewsByEmployeeQuery
} = newsApiSlice
