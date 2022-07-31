import {apiSlice} from '../../app/api/apiSlice'

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints:builder => ({
    getNews: builder.query({
      query: () => '/news',
      keepUnusedDataFor:5,
    })
  })
})
export const {
  useGetNewsQuery
} = newsApiSlice
