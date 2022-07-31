import {useLocation } from "react-router-dom"
import {useState,useEffect,useRef} from 'react'
import useGlobalContext from '../hooks/useGlobalContext'
// import useAxiosPrivate from '../hooks/useAxiosPrivate'
import NewsRow from './NewsRow'
const NewsTable = () => {
  const {newsState,addNews,test} = useGlobalContext()
  const {loading,news,success} = newsState
  // const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const TITLE_REGEX = /^[a-zA-Z0-9-_\s]{3,40}$/
  const BODY_REGEX = /^[a-zA-Z][a-zA-Z0-9-_\s]{10,200}$/
  const [tab,setTab] = useState('search')
  const [search,setSearch] = useState({
                                      inputText:'',
                                      inputRadio:''
                                      })

  const [numPage,setNumPage] = useState(0)

  const [body,setBody] = useState('')
  const [validBody,setValidBody] = useState(false)
  const [bodyFocus, setBodyFocus] = useState(false)
  const [charatersLeft, setCharatersLeft] = useState(200)

  const [title,setTitle] = useState('')
  const [validTitle ,setValidTitle] = useState(false)
  const [titleFocus, setTitleFocus] = useState(false)

  useEffect(()=>{
    setCharatersLeft(200 - body.length)
    const result = BODY_REGEX.test(title)
    setValidBody(result)
  },[body])

  useEffect(()=>{
    setSearch({
                inputText:'',
                inputRadio:''
              })
  },[tab])

  useEffect(()=>{
    const result = TITLE_REGEX.test(title)
    setValidTitle(result)
  },[title])

  const handleAdd = (e) => {
    e.preventDefault()
    addNews(location,title,body)
  }

  useEffect(()=>{
    test(numPage,search,false,location)
  },[numPage])

  const handleSearch = (e) =>{
    e.preventDefault()
    setNumPage(0)
  }

  useEffect(()=> {
    if(success){
      setTitle('')
      setBody('')
      setCharatersLeft(200)
    }
  },[success])

  const handleInput = (e) => {
    setSearch(prevSearch => {
      return {...prevSearch,
              [e.target.name]:e.target.value
            }
    })
  }

  return (
        <div className="container">
          <ul className="nav nav-tabs mt-2">
            <li className="nav-item">
              <a className={`nav-link ${tab === 'add' ? 'active':''}`} aria-current="page" onClick={()=>setTab('add')} > Add news
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${tab === 'search' ? 'active':''}`} onClick={()=>setTab('search')} > Search
              </a>
            </li>
          </ul>
          {success &&
            <div className="alert alert-success" role="alert">
              Your news has been added
            </div>
          }
          {tab === 'search' ?
            (<form onSubmit={handleSearch}>
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
            </form>):
            (<form className="row g-2 mt-2" onSubmit={handleAdd}>
              <div className="mb-3">
                <label  className="form-label">Title</label>
                <input className="form-control"
                      type="text"
                      onChange={(e)=> setTitle(e.target.value)}
                      value={title}
                      autoComplete='off'
                      onFocus={()=>setTitleFocus(true)}
                      onBlur={()=>setTitleFocus(false)}/>
                      {(titleFocus && title && !validTitle) &&
                        <div className="alert alert-dark" role="alert">
                          Must be between 3 to 40 characters.
                        </div>
                      }
              </div>
              <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea className="form-control" rows="3"
                          onChange={(e)=> setBody(e.target.value)}
                          value={body}
                          onFocus={()=>setBodyFocus(true)}
                          onBlur={()=>setBodyFocus(false)}></textarea>
                {(bodyFocus && body && !validBody) &&
                  <div className="alert alert-dark" role="alert">
                    Must be between 10 to 200 characters.
                    {`You have ${charatersLeft} charaters left`}
                  </div>
                }
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={!validTitle||!validBody? true: false}>Add News</button>
              </div>
            </form>)
        }
        {news.length ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Username</th>
              <th scope="col">Title</th>
              <th scope="col">Likes</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
          {news.map((article)=> {
            return (<NewsRow {...article} key={article._id}/>
            )
          })}
          </tbody>
          </table>
      ):(
        <div className="card-body">
          <p className="card-text">No news to display</p>
        </div>
      )}
      </div>
  );
}

export default NewsTable;
