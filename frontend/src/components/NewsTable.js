import {useLocation } from "react-router-dom"
import {useState,useEffect} from 'react'
import useGlobalContext from '../hooks/useGlobalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const NewsTable = () => {
  const {newsState,reset} = useGlobalContext()
  const {loading,news} = newsState
  const [numPage,setNumPage] = useState(0)
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  // useEffect(()=>{
  //   test(axiosPrivate,numPage,search,false)
  // },[numPage])
  // const search =
  return (
        <div className="container">
          <form className="row g-2 mt-2">
            <div className="mb-3">
              <label  className="form-label">Title</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Body</label>
              <textarea className="form-control" rows="3"></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Add News</button>
            </div>
          </form>
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
            return (
              <tr key={article._id}>
                <th scope="row">{article._id}</th>
                <td>{article.username}</td>
                <td>{article.title}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="badge text-bg-dark">{article.likes.length}</span>
                    </button>
                    {article.likes.length &&
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {article.likes.map((username,i)=>{
                          return <li><a className="dropdown-item">{username}</a></li>
                        })}
                      </ul>
                    }
                  </div>
                </td>
                <td>hi</td>
              </tr>
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
