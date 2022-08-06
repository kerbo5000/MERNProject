import {useLocation} from "react-router-dom"
import {useState,useEffect} from 'react'
import NewsContainer from '../components/NewsContainer'
import SearchFrom from "../components/SearchForm"
const Home = () => {
    const [tab,setTab] = useState('newsfeed')
    const [numPage,setNumPage] = useState(0)
    const location = useLocation()
    const [search,setSearch] = useState({
                                        inputText:'',
                                        inputRadio:''
                                        })


    useEffect(()=>{
      setNumPage(0)
      setSearch({
                  inputText:'',
                  inputRadio:''
                })
    },[tab])

    useEffect(()=>{
      if(tab === 'favorites'){
        test(numPage,search,true,location)
      }else{
        test(numPage,search,false,location)
      }
    },[numPage,tab])

    const handleInput = (e) => {
      setSearch(prevSearch => {
        return {...prevSearch,
                [e.target.name]:e.target.value
              }
      })
    }
    
    return (
      <div className="card-body">
        <h5 className="card-title">Home</h5>
        <SearchFrom search={search} setNumPage={setNumPage} handleInput={handleInput}/>
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
