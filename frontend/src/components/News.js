import { useState,useEffect } from 'react'
import Comments from './Comments'
import {useLocation } from "react-router-dom"
import useGlobalContext from '../hooks/useGlobalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const News = ({_id,username,title,body,comments,likes}) => {
  const {authState,likeNews} = useGlobalContext()
  const [open, setOpen] = useState(false);
  const {user} = authState
  const [liked,setLiked] = useState(likes.includes(user))
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()

  const likeBtn = () => {
    setLiked((prev) => {
      console.log(`${title} from ${prev} to ${!prev}`)
      return !prev
    })
  }
  useEffect(()=>{
    if(liked){
      likeNews(axiosPrivate,_id,'like',location)
    }else{
      likeNews(axiosPrivate,_id,'unlike',location)
    }
  },[liked])

  return (
    <div className="clearfix mt-2">
      <div className="card">
        <h5 className="card-header">{title}</h5>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p className="fs-6">{body}</p>
            <footer className="blockquote-footer"><cite title="Source Title" className="fs-6">{username}</cite></footer>
          </blockquote>
          <div className="btn-group mt-2" role="group" aria-label="Basic example">
            <button type="button" className={`shadow-none btn ${liked ?'btn-danger':'btn-secondary'}`} onClick={likeBtn}>
              Like <span className="badge text-bg-dark">{likes.length}</span>
            </button>
            <button className="btn btn-primary shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#comments${_id}`} aria-expanded="false" aria-controls={`comments${_id}`}>
              Comments
            </button>
          </div>
        </div>
        <div className="card-footer collapse" id={`comments${_id}`}>
          <div className="card card-body">
            <Comments comments={comments} id={_id} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default News;
