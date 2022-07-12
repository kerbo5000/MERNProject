import {useLocation } from "react-router-dom"
import {useEffect} from 'react'
import useGlobalContext from '../hooks/useGlobalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import News from './News'

const NewsFeed = () => {
  const {newsState,getNews,reset} = useGlobalContext()
  const {loading,news} = newsState
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  useEffect(()=>{
    getNews(axiosPrivate,location)

    return () => {
      reset('news')
    }
  },[])

  if(loading){
    return (
      <div className="card-body">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      )
  }
  return (
    <>
      {news.length ? (
        <div className="container">
          {news.map((article) => {
            return <News key={article._id} {...article}/>
          })}
        </div>
      ):(
        <div className="card-body">
          <p className="card-text">No news to display</p>
        </div>
      )}
    </>
  )
}

export default NewsFeed;
