import {useLocation,Link,useNavigate} from "react-router-dom"
import {useGetSingleNewsQuery} from '../features/news/newsApiSlice'
import {format} from 'date-fns'


const NewsGrid = ({article}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const {data:news,isLoading,isError,isSuccess,error} = useGetSingleNewsQuery(article)

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
      <Link to={`/news/${news._id}`} style={{textDecoration:'none',color:'black'}}>
        <div className="col" >
          <div className="card h-100">
            <div className="card-body">
            <h5 className="card-title">{news.title}</h5>
              <p className="card-text">{`${news.body.substring(0,100)}...`}</p>
            </div>
            <div className="card-footer">
              <div className="d-flex w-100 justify-content-between">
                  <small className="text-muted mb-1">{`liked by ${news.likes.length == 0 ? 'nobody' : news.likes.length == 1 ? '1 user':`${news.likes.length} users`}`}</small>
                <small>{format(new Date(news.createdAt),'PP')}</small>
              </div>
            </div>
          </div>
        </div>
      </Link>
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

export default NewsGrid;
