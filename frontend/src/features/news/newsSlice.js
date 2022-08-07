import {createEntityAdapter,createSlice} from '@reduxjs/toolkit'
``
const newsAdapter = createEntityAdapter()
const initialState = newsAdapter.getInitialState()

const newsSlice = createSlice({
  name:'news',
  initialState,
  reducers:{
    scrollNews(state,action){
      newsAdapter.addMany(state,action.payload)
    },
    singleNews(state,action){
      newsAdapter.setAll(state,action.payload)
    },
    updateNews(state,action){
      newsAdapter.setOne(state,action.payload)
    }
  }
})
export const {
  selectAll: selectAllNews,
  selectById: selectNewsById,
  selectIds: selectNewsIds
} = newsAdapter.getSelectors(state => state.news)
export const { scrollNews,singleNews,updateNews} = newsSlice.actions
export default newsSlice.reducer