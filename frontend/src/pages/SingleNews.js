import { useState,useEffect } from 'react'
import Comments from '../components/Comments'
import {useLocation,useParams,useNavigate,Link} from "react-router-dom"
import useGlobalContext from '../hooks/useGlobalContext'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'
const SingleNews = () => {
  const {newsId} = useParams()
  // const axiosPrivate = useAxiosPrivate()
  const {getNewsById,newsState,likeNews,authState} = useGlobalContext()
  // const navigate = useNavigate()
  const location = useLocation()
  const {news,loading} = newsState
  const {roles} = authState

  useEffect(()=>{
    getNewsById(location,newsId)
  },[])

  const {title,username,body,liked,likes,comments} = news[0]
  const likeBtn = () => {
    if(liked){
      likeNews(newsId,'unlike',location)
    }else{
      likeNews(newsId,'like',location)
    }
  }
  const text = {textIndent:'50px',
                textAlign:'justify'}
  // if(!Boolean(news.length)){
  //   navigate('/')
  // }
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
    <div className="card-body px-5">
      <h5 className="card-title">{title}</h5>
      <Link to={`/employee/${username}`} style={{textDecoration:'none',color:'black'}}>
        <h6 className="card-subtitle mb-2 text-muted mt-2">{username}</h6>
      </Link>
      <p className="fs-6 lh-base mt-2" style={text}>{`By ${body}`}</p>
      <button type="button" className={`shadow-none btn ${liked ?'btn-danger':'btn-secondary'}`} onClick={likeBtn} disabled={roles.includes(2001)?false:true}>
        Like <span className="badge text-bg-dark">{likes.length}</span>
      </button>
      <div className="card card-body mt-2">
        <Comments comments={comments} id={newsId} />
      </div>
    </div>
  )
}


export default SingleNews;
