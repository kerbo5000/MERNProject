import Comments from './Comments'
import {useLocation,Link,useNavigate } from "react-router-dom"
import {selectNewsById} from '../features/news/newsSlice'
import {useSelector} from 'react-redux'
import {useLikeNewsMutation} from '../features/news/newsApiSlice'
import {useDispatch} from 'react-redux'
import {updateNews} from '../features/news/newsSlice'
import {selectCurrentRoles} from '../features/auth/authSlice'
import React from 'react'
const News = React.forwardRef(({newsId},ref) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const article = useSelector((state) =>selectNewsById(state,newsId))
  const [likeNews] = useLikeNewsMutation()
  const roles = useSelector(selectCurrentRoles)

  const likeBtn = async () => {
    try{
      if(article.likes.includes(newsId)){
        const updatedArticle = await likeNews({newsId,like:'unlike'}).unwrap()
        dispatch(updateNews(updatedArticle.data))
      }else{
        const updatedArticle = await likeNews({newsId,like:'like'}).unwrap()
        dispatch(updateNews(updatedArticle.data))
      }
    }catch (err){
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
    
  }
  const newsBody = (
    <>
      <div className="card">
        <Link to={`/news/${newsId}`} style={{textDecoration:'none',color:'black'}}>
          <h5 className="card-header">{article.title}</h5>
        </Link>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <Link to={`/news/${newsId}`} style={{textDecoration:'none',color:'black'}}>
              <p className="fs-6">{`${article.body.substring(0,200)}...`}</p>
            </Link>
            <Link to={`/employee/${article.employee}`} style={{textDecoration:'none',color:'black'}}>
              <footer className="blockquote-footer"><cite title="Source Title" className="fs-6">{article.username}</cite></footer>
            </Link>
          </blockquote>
          <div className="btn-group mt-2" role="group" aria-label="Basic example">
            <button type="button" className={`shadow-none btn ${article.likes.includes(newsId) ?'btn-danger':'btn-secondary'}`} onClick={likeBtn} disabled={roles.includes(2001) ? false : true}>
              Like <span className="badge text-bg-dark">{article.likes.length}</span>
            </button>
            <button className="btn btn-primary shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#comments${newsId}`} aria-expanded="false" aria-controls={`comments${newsId}`}>
              Comments
            </button>
          </div>
        </div>
        <div className="card-footer collapse" id={`comments${newsId}`}>
          <div className="card card-body">
            <Comments comments={article.comments} newsId={newsId} />
          </div>
        </div>
      </div>
    </>
  )
  const content = ref
    ? <div className="clearfix mt-2" ref={ref}>{newsBody}</div>
    : <div className="clearfix mt-2">{newsBody}</div>

  return content

})


export default News;
