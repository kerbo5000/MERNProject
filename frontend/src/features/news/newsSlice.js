import {createEntityAdapter,createSlice} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const newsAdapter = createEntityAdapter()
const initialState = newsAdapter.getInitialState()

const newsSlice = createSlice({
  name:'news',
  initialState,
  reducers:{
    scrollNews(state,action){
      newsAdapter.upsertMany(state,action.payload)
    },
    singleNews(state,action){
      newsAdapter.setAll(state,action.payload)
    },
    likeNews(sate,action){
      newsAdapter.setOne(state,action.payload)
    },
    updateNews(state,action){
      newsAdapter.setOne(state,action.payload)
    },
    commentNews(state,action){
      newsAdapter.setOne(state,action.payload)
    }
  }
})