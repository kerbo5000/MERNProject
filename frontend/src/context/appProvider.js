import {createContext,useReducer} from 'react'
import { useNavigate} from "react-router-dom"
import authReducer from '../reducers/authReducer'
import newsReducer from '../reducers/newsReducer'
// import userReducer from '../reducers/userReducer'
import authRequest from '../api/authRequest'
import newsRequest from '../api/newsRequest'
// import userRequest from '../api/userRequest'
const AppContext = createContext()
const authInitialState = {
  loading: false,
  user:'',
  roles:[],
  accessToken:'',
  error:'',
  success:false,
}
const newsInitialState = {
  loading: false,
  news:[],
  error:'',
  success:false,
}
// const userInitialState = {
//   loading: false,
//   users:[],
//   error:'',
//   success:false,
// }
export const AppProvider = ({children}) => {
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
                                          accessToken:response.accessToken
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

  const getNews = async (axiosPrivate,location) => {
    try{
      newsDispatch({type:'LOADING'})
      const response = await newsRequest.getNews(axiosPrivate)
      newsDispatch({type:'SET_NEWS',payload:response})
    }catch(err){
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    }
  }

  const likeNews = async (axiosPrivate,id,type,location) => {
    try{
      const response = await newsRequest.likeNews(axiosPrivate,id,type)
      newsDispatch({type:'LIKE_COMMENT_NEWS',payload:response})
    }catch(err){
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    }
  }

  const commentNews = async (axiosPrivate,id,body,location) => {
    try{
      const response = await newsRequest.commentNews(axiosPrivate,id,body)
      newsDispatch({type:'LIKE_COMMENT_NEWS',payload:response})
    }catch(err){
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    }
  }

  const searchNews = async (axiosPrivate,location,data) => {
    try{
      newsDispatch({type:'LOADING'})
      const response = await newsRequest.searchNews(axiosPrivate,data)
      newsDispatch({type:'SET_NEWS',payload:response})
    }catch(err){
      console.error(err)
      navigate('/login',{state:{from:location},replace:true})
    }
  }

  return (
    <AppContext.Provider value={{
      authState,
      newsState,
      register,
      login,
      refreshAccessToken,
      reset,
      getNews,
      likeNews,
      commentNews,
      searchNews
    }}>
      {children}
    </AppContext.Provider>
  )
}
export default AppContext
