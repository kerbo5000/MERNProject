import {useLocation,Link,useNavigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import {useLikeNewsMutation} from '../features/news/newsApiSlice'
import {selectCurrentRoles,selectCurrentUserId} from '../features/auth/authSlice'
import {format} from 'date-fns'


const News = ({article}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [likeNews] = useLikeNewsMutation()
  const roles = useSelector(selectCurrentRoles)
  const userId = useSelector(selectCurrentUserId)

  const likeBtn = async () => {
    try{
      if(article.likes.includes(userId)){
        await likeNews({newsId:article._id,like:'unlike'}).unwrap()
      }else{
        await likeNews({newsId:article._id,like:'like'}).unwrap()
      }
    }catch (err){
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
    
  }

  return (
    <div className="card mt-2">
      <div className='card-header'>
        <div className="d-flex w-100 justify-content-between">
          <Link to={`/news/${article._id}`} style={{textDecoration:'none',color:'black'}}>
            <h5 className="mb-1">{article.title}</h5>
          </Link>
          <small>{format(new Date(article.createdAt),'PP')}</small>
        </div>
      </div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <Link to={`/news/${article._id}`} style={{textDecoration:'none',color:'black'}}>
            <p className="fs-6">{`${article.body.substring(0,300)}...`}</p>
          </Link>
          <Link to={`/news/employee/${article.employee}`} style={{textDecoration:'none',color:'black'}}>
            <footer className="blockquote-footer"><cite title="Source Title" className="fs-6">{article.username}</cite></footer>
          </Link>
        </blockquote>
        <div className="btn-group mt-2" role="group" aria-label="Basic example">
          <button type="button" className={`shadow-none btn ${article.likes.includes(userId) ?'btn-danger':'btn-secondary'}`} onClick={likeBtn} disabled={roles.includes(2001) ? false : true}>
            Like <span className="badge text-bg-dark">{article.likes.length}</span>
          </button>
          <button type="button" className="shadow-none btn btn-primary">
            Comments <span className="badge text-bg-dark">{article.comments.length}</span>
          </button>
        </div>
      </div>
      {/* <div className="card-footer collapse" id={`comments${article._id}`}>
        <div className="card card-body">
          <Comments comments={article.comments} newsId={article._id} />
        </div>
      </div> */}
    </div>
  )
}
export default News;
