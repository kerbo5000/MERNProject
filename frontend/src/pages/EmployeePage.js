import { useState,useEffect } from 'react'
import {useLocation,useParams,useNavigate} from "react-router-dom"
import useGlobalContext from '../hooks/useGlobalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import NewsGrid from '../components/NewsGrid'

const EmployeePage = () => {
  const {username} = useParams()
  const axiosPrivate = useAxiosPrivate()
  const {employeeNews,newsState,likeNews} = useGlobalContext()
  const [numPage,setNumPage] = useState(0)
  const [search,setSearch] = useState({
                                      inputText:'',
                                      inputRadio:'title'
                                      })
  const handleInput = (e) => {
    setSearch(prevSearch => {
      return {...prevSearch,
              [e.target.name]:e.target.value
            }
    })
  }

  useEffect(()=>{
    employeeNews(axiosPrivate,numPage,search,username)
  },[numPage])

  const handleSubmit = (e) =>{
    e.preventDefault()
    setNumPage(0)
  }

  return (
    <div className="card-body">
      <h5 className="card-title ">{`${username}'s page`}</h5>
      <form className="row gy-2 gx-3 align-items-center mb-2" onSubmit={handleSubmit}>
        <div className="col-10">
          <input type="text" className="form-control" name="inputText" onChange={handleInput}
          value={search.inputText}/>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      <NewsGrid setNumPage={setNumPage}/>
    </div>
  )
}


export default EmployeePage;
