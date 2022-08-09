import {useEffect} from 'react'
import {  useGetNewsSearchQuery} from '../features/news/newsApiSlice'
import {format} from 'date-fns'
import {useLocation,useNavigate} from "react-router-dom"
const SearchResult = ({search}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const {data:news,isLoading,isSuccess,isError,error} = useGetNewsSearchQuery(search)
  let content
  if(isSuccess && news?.length){
    content = (
      <div className="list-group overflow-scroll" style={{position:'absolute',top:'5px',zIndex:'3',height: '500px'}} >
        {news.map((article) => {
          return <a href="#" className="list-group-item list-group-item-action" key={article._id}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{article.title}</h5>
                    <small>{format(new Date(article.createdAt),'PP')}</small>
                  </div>
                  <p className="mb-1">{`${article.body.substring(0,50)}...`}</p>
                  <small>{article.username}</small>
                </a>
          }
        )}
      </div>
    )
  }else if(isSuccess){
    content = (<p className="mb-1" style={{position:'absolute',top:'5px',zIndex:'3'}}>No news found</p>)
  }
  useEffect(() => {
    if(isError){
      console.error(error);
      navigate('/login', { state: { from: location }, replace: true });
    }
  },[error,location,navigate,isError])
  return (
    <>
      {isLoading &&
      (
        <div className="d-flex justify-content-center" >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
      }
      {content}
    </> 
  )
}

export default SearchResult