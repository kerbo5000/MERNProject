import {useLocation,useNavigate} from "react-router-dom"
import {useState,useEffect} from 'react'
import NewsContainer from '../components/NewsContainer'
// import SearchBar from "../components/SearchBar"
import {useDispatch} from 'react-redux'
import {scrollNews} from '../features/news/newsSlice'
import {useGetNewsQuery} from '../features/news/newsApiSlice'
import {useSelector} from 'react-redux'
import {selectCurrentUserId} from '../features/auth/authSlice'
const Home = () => {
    const [tab,setTab] = useState('newsfeed')
    const [numPage,setNumPage] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()
    const userId = useSelector(selectCurrentUserId)
    const dispatch = useDispatch()
    const [nextPage,setNextPage] = useState(false)
    
    const [getNews,{isLoading}] = useGetNewsQuery()
    
    useEffect(()=>{
      setNumPage(0)
    },[tab])

    useEffect(()=>{
      const setNews = async () => {
        try{
          if(tab === 'favorites'){
            const news = await getNews(numPage,userId).unwrap()
            dispatch(scrollNews(news.data))
            if(news.data.length){
              setNextPage(true)
            }else{
              setNextPage(false)
            }
          }else{
            const news = await getNews(numPage,null).unwrap()
            dispatch(scrollNews(news.data))
            if(news.data.length){
              setNextPage(true)
            }else{
              setNextPage(false)
            }
          }
        }catch (err){
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
        }
      }
      setNews()
    },[numPage,tab])
    
    return (
      <div className="card-body">
        <h5 className="card-title">Home</h5>
        {/* <SearchBar setNumPage={setNumPage} /> */}
        <ul className="nav nav-tabs mt-2">
          <li className="nav-item">
            <a className={`nav-link ${tab === 'newsfeed' ? 'active':''}`} aria-current="page" onClick={()=>setTab('newsfeed')} >News Feed
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${tab === 'favorites' ? 'active':''}`} onClick={()=>setTab('favorites')} >Favorites
            </a>
          </li>
        </ul>
        {isLoading ?
        (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          ):<NewsContainer setNumPage={setNumPage} nextPage={nextPage}/>}
      </div>
    )
}

export default Home
