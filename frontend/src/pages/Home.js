import { Link, useLocation,Outlet } from "react-router-dom"
import {useState,useEffect} from 'react'
import useGlobalContext from '../hooks/useGlobalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useNews from '../hooks/useNews'
import NewsContainer from '../components/NewsContainer'
const Home = () => {
    const {test} = useGlobalContext()
    const [tab,setTab] = useState('newsfeed')
    const [numPage,setNumPage] = useState(0)
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const [search,setSearch] = useState({
                                        inputText:'',
                                        inputRadio:''
                                        })

    // const logout = async () => {
    //     // if used in more components, this should be in context
    //     // axios to /logout endpoint
    //     // setAuth({})
    //     navigate('/linkpage')
    // }
    useEffect(()=>{
      setNumPage(0)
      setSearch({
                  inputText:'',
                  inputRadio:''
                })
    },[tab])

    useEffect(()=>{
      if(tab === 'favorites'){
        test(axiosPrivate,numPage,search,true,location)
      }else{
        test(axiosPrivate,numPage,search,false,location)
      }
    },[numPage,tab])

    const handleInput = (e) => {
      setSearch(prevSearch => {
        return {...prevSearch,
                [e.target.name]:e.target.value
              }
      })
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      setNumPage(0)
    }

    return (
      <div className="card-body">
        <h5 className="card-title">Home</h5>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="inputText" className="col-sm-2 col-form-label">Search</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputText" name="inputText" onChange={handleInput}
              value={search.inputText}/>
            </div>
          </div>
          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0">Filter</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="inputRadio" id="username"  value="username" onChange={handleInput}/>
                <label className="form-check-label" htmlFor="username">
                  Username
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="inputRadio" id="title" value="title" onChange={handleInput}/>
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
            <a className={`nav-link ${tab === 'newsfeed' ? 'active':''}`} aria-current="page" onClick={()=>setTab('newsfeed')} >News Feed
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${tab === 'favorites' ? 'active':''}`} onClick={()=>setTab('favorites')} >Favorites
            </a>
          </li>
        </ul>
        <NewsContainer setNumPage={setNumPage}/>
      </div>
    )
}

export default Home
