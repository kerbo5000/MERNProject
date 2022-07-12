import { Link, useLocation,Outlet } from "react-router-dom"
import {useState} from 'react'
import useGlobalContext from '../hooks/useGlobalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const Home = () => {
    // const [news,setNews] = useState()
    const {searchNews} = useGlobalContext()
    const [tab,setTab] = useState('newsfeed')
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const [search,setSearch] = useState({
                                        inputText:'',
                                        inputRadio:''
                                        })
    // useEffect(()=>{
    //   getNews(axiosPrivate,location)
    //   return () => {
    //     reset('news')
    //   }
    // },[])

    // const logout = async () => {
    //     // if used in more components, this should be in context
    //     // axios to /logout endpoint
    //     // setAuth({})
    //     navigate('/linkpage')
    // }


    const handleInput = (e) => {
      setSearch(prevSearch => {
        return {...prevSearch,
                [e.target.name]:e.target.value
              }
      })
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      searchNews(axiosPrivate,location,search)
    }
    return (
      <div className="card-body">
        <h5 className="card-title">Home</h5>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="inputText" className="col-sm-2 col-form-label">Search</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputText" onChange={handleInput}
              value={search.inputText}/>
            </div>
          </div>
          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0">Filter</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="inputRadio" id="username" onChange={handleInput}/>
                <label className="form-check-label" htmlFor="username">
                  Username
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="inputRadio" id="title" onChange={handleInput}/>
                <label className="form-check-label" htmlFor="title">
                  Title
                </label>
              </div>
            </div>
          </fieldset>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        <ul className="nav nav-tabs mt-2">
          <li className="nav-item">
            <Link to='/newsfeed' className={`nav-link ${tab === 'newsfeed' ? 'active':''}`} onClick={()=>setTab('newsfeed')}>
              News Feed
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/favorites' className={`nav-link ${tab === 'favorites' ? 'active':''}`} onClick={()=>setTab('favorites')}>
              Favorites
            </Link>
          </li>
        </ul>
        <Outlet/>
      </div>
    )
}

export default Home
