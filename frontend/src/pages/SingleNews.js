import Comments from '../components/Comments'
import {useLocation,useParams,Link,useNavigate} from "react-router-dom"
import {useGetSingleNewsQuery,useLikeNewsMutation} from '../features/news/newsApiSlice'
import {useSelector} from 'react-redux'
import {selectCurrentRoles,selectCurrentUserId} from '../features/auth/authSlice'
import {format} from 'date-fns'


const SingleNews = () => {
  const {newsId} = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const userId = useSelector(selectCurrentUserId)
  const roles = useSelector(selectCurrentRoles)
  const [likeNews] = useLikeNewsMutation()

  const {data:news,isLoading,isError,isSuccess,error} = useGetSingleNewsQuery(newsId)

  const likeBtn = async () => {
    try{
      if(news.likes.includes(userId)){
        await likeNews({newsId:news._id,like:'unlike'}).unwrap()
      }else{
        await likeNews({newsId:news._id,like:'like'}).unwrap()
      }
    }catch (err){
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
    
  }
  const text = {textIndent:'50px',
                textAlign:'justify'}
  let content
  if(isLoading){
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }else if(isSuccess && news){
    content = (
          <div className="card-body px-5">
            <h3 className="card-title">{news.title}</h3>
            <Link to={`/news/employee/${news.employee}`} style={{textDecoration:'none',color:'black'}}>
              <h6 className="card-subtitle mb-2 text-muted mt-2">{news.username} - Posted: {format(new Date(news.createdAt),'PP')}</h6>
            </Link>
            <p className="fs-5 lh-lg mt-2" style={text}>{`By ${news.body}`}</p>
            <button type="button" className={`shadow-none btn ${news.likes.includes(userId) ?'btn-danger':'btn-secondary'}`} onClick={likeBtn} disabled={roles.includes(2001) ? false : true}>
            Like <span className="badge text-bg-dark">{news.likes.length}</span>
          </button>
            <div className="card card-body mt-2 w-50">
              <Comments comments={news.comments} newsId={newsId} />
            </div>
          </div>
    )
  }else if(isSuccess){
    content = (<div className="alert alert-dark" role="alert">
                No news to display
              </div>)  
  }else if(isError){
    console.error(error);
    navigate('/login', { state: { from: location }, replace: true });
  }
  
  return content
}


export default SingleNews;
