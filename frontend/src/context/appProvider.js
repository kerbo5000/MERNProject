import {createContext,useReducer,useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import authReducer from '../reducers/authReducer'
import newsReducer from '../reducers/newsReducer'
// import userReducer from '../reducers/userReducer'
import authRequest from '../api/authRequest'
import newsRequest from '../api/newsRequest'
// import userRequest from '../api/userRequest'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const AppContext = createContext()
const authInitialState = {
  loading: false,
  user:'',
  roles:[],
  accessToken:'',
  error:'',
  success:false,
  id:''
}
const newsInitialState = {
  loading: false,
  news:[],
  error:'',
  nextPage:false
}
// const userInitialState = {
//   loading: false,
//   users:[],
//   error:'',
//   success:false,
// }
export const AppProvider = ({children}) => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const [authState,authDispatch] = useReducer(authReducer,authInitialState)
  const [newsState,newsDispatch] = useReducer(newsReducer,newsInitialState)
  // const [userState,userDispatch] = useReducer(userReducer,userInitialState)
  const register = async (user,pwd) => {
    try{
      authDispatch({type:'LOADING'})
      await authRequest.register(user,pwd)
      authDispatch({type:'REGISTER'})
    }catch(err){
      if(!err?.response){
        authDispatch({type:'ERROR',payload:'No server response'})
      } else if(err.response?.status === 409){
        authDispatch({type:'ERROR',payload:'Username taken'})
      } else{
        authDispatch({type:'ERROR',payload:'Registration Falied'})
      }
    }
  }

  const login = async (user,pwd,type) => {
    try{
      authDispatch({type:'LOADING'})
      const response = await authRequest.login(user,pwd,type)
      authDispatch({type:'LOGIN',payload:{user,
                                          roles:response.roles,
                                          accessToken:response.accessToken,
                                          id:response.id
                                    }})
    }catch(err){
      if(!err?.response){
        authDispatch({type:'ERROR',payload:'No server response'})
      } else if(err.response?.status === 400){
        authDispatch({type:'ERROR',payload:'Missing username or password'})
      }else if(err.response?.status === 401){
        authDispatch({type:'ERROR',payload:'Unauthorized'})
      }else{
        authDispatch({type:'ERROR',payload:'Login Falied'})
      }
    }
  }
  const refreshAccessToken = (accessToken) => {
    authDispatch({type:'REFRESH_ACCESS_TOKEN',payload:accessToken})
  }

  const reset = (type) => {
    switch(type){
      case 'auth':
        authDispatch({type:'RESET', payload:authInitialState})
        break
      case 'news':
        newsDispatch({type:'RESET', payload:newsInitialState})
        break
    }
  }

  const likeNews = async (id,type,location) => {
    try{
      const response = await newsRequest.likeNews(axiosPrivate,id,type)
      newsDispatch({type:'UPDATE_ARTICLE',payload:{response,user:authState.user}})
    }catch(err){
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    }
  }

  const commentNews = async (id,body,location) => {
    try{
      const response = await newsRequest.commentNews(axiosPrivate,id,body)
      newsDispatch({type:'UPDATE_ARTICLE',payload:{response,user:authState.user}})
    }catch(err){
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    }
  }

  const getNewsById = async (location,id) => {
    try{
      newsDispatch({type:'LOADING'})
      const response = await newsRequest.getNewsById(axiosPrivate,id)
      newsDispatch({type:'NEWS_ID',payload:{response,user:authState.user}})
    }catch(err){
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    }
  }

  const test = async (pageNum,search,favorites,location) =>{
    if(pageNum === 0){
      reset('news')
    }
    newsDispatch({type:'LOADING'})
    try{
      const data = await newsRequest.getNews(axiosPrivate,pageNum,search,favorites ? authState.user: '')
      newsDispatch({type:'SCROLL_NEWS',payload:{response:data,user:authState.user}})
    }catch (err){
      console.log('hii')
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    }
  }
  const employeeNews = async (pageNum,search,username) =>{
    if(pageNum === 0){
      reset('news')
    }
    newsDispatch({type:'LOADING'})
    try{
      const data = await newsRequest.getNewsByEmployee(axiosPrivate,pageNum,search,username)
      newsDispatch({type:'SCROLL_NEWS',payload:{response:data,user:authState.user}})
    }catch (e){
      newsDispatch({type:'ERROR',payload:e.message})
    }
  }

  const addNews = async (location,title,body) => {
    try{
      newsDispatch({type:'LOADING'})
      const response = await newsRequest.addNews(axiosPrivate,title,body)
      newsDispatch({type:'NEWS_ADDED'})
    }catch(err){
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    }
  }
  // useEffect(()=>{
  //   console.log(newsState.news)
  // },[newsState])
  return (
    <AppContext.Provider value={{
      authState,
      newsState,
      register,
      login,
      refreshAccessToken,
      reset,
      likeNews,
      commentNews,
      test,
      getNewsById,
      employeeNews,
      addNews
    }}>
      {children}
    </AppContext.Provider>
  )
}
export default AppContext