import {useGetNewsQuery} from '../features/news/newsApiSlice'
import {useState} from 'react'
import {useLocation,useNavigate} from "react-router-dom"
import News from './News'
import Pagination from './Pagination'

const NewsFeed = () => {
  const [pageNum,setPageNum] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const {data:news,isLoading,isError,isSuccess,error} = useGetNewsQuery(pageNum)
  let content
  if(isLoading){
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }else if(isSuccess && news?.length){
    content = (
            <div className="container">
              {news.map((article) => <News key={article._id} article={article}/>)}
            </div>
    )
  }else if(isSuccess){
    content = (<div class="alert alert-dark" role="alert">
                No news to display
              </div>)  
  }else if(isError){
    console.error(error);
    navigate('/login', { state: { from: location }, replace: true });
  }

  // useEffect(() => {
  //   if(isError){
      
  //   }
  // },[pageNum,error,location,navigate,isError])

  return (
    <div className="card-body">
      {content}
      <Pagination pageNum={pageNum} setPageNum={setPageNum} nextPage={Boolean(news?.length)}/>
    </div>
  )
}

export default NewsFeed