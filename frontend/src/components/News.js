import { useState,useEffect } from 'react'
import Comments from './Comments'
import {useLocation,Link } from "react-router-dom"
import useGlobalContext from '../hooks/useGlobalContext'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'
import React from 'react'
const News = React.forwardRef(({_id,username,title,body,comments,likes,liked},ref) => {
  const {likeNews} = useGlobalContext()
  const [open, setOpen] = useState(false);
  // const [liked,setLiked] = useState(likes.includes(user))
  // const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const likeBtn = () => {
    if(liked){
      likeNews(_id,'unlike',location)
    }else{
      likeNews(_id,'like',location)
    }
  }
  const newsBody = (
    <>
      <div className="card">
        <Link to={`/news/${_id}`} style={{textDecoration:'none',color:'black'}}>
          <h5 className="card-header">{title}</h5>
        </Link>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <Link to={`/news/${_id}`} style={{textDecoration:'none',color:'black'}}>
              <p className="fs-6">{`${body.substring(0,200)}...`}</p>
            </Link>
            <Link to={`/employee/${username}`} style={{textDecoration:'none',color:'black'}}>
              <footer className="blockquote-footer"><cite title="Source Title" className="fs-6">{username}</cite></footer>
            </Link>
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
    </>
  )
  const content = ref
    ? <div className="clearfix mt-2" ref={ref}>{newsBody}</div>
    : <div className="clearfix mt-2">{newsBody}</div>


  // useEffect(()=>{
  //   if(liked){
  //     likeNews(axiosPrivate,_id,'like',location)
  //   }else{
  //     likeNews(axiosPrivate,_id,'unlike',location)
  //   }
  // },[liked])

  return content

})


export default News;
