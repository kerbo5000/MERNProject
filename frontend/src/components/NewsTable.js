import {useLocation } from "react-router-dom"
import {useState,useEffect} from 'react'
import useGlobalContext from '../hooks/useGlobalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const NewsTable = () => {
  const {newsState,getNews,reset} = useGlobalContext()
  const {loading,news} = newsState
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  useEffect(()=>{
    getNews(axiosPrivate,location)
    return () => {
      reset('news')
    }
  },[])

  return (
    <>
      {news.length ? (
        <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Username</th>
              <th scope="col">Title</th>
              <th scope="col">Body</th>
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
                <td>{article.body}</td>
                <td>
                  <div class="dropdown">
                    <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="badge text-bg-dark">{article.likes.length}</span>
                    </button>
                    {article.likes.length &&
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {article.likes.map((username,i)=>{
                          return <li><a class="dropdown-item">{username}</a></li>
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
        </div>
      ):(
        <div className="card-body">
          <p className="card-text">No news to display</p>
        </div>
      )}
    </>
  );
}

export default NewsTable;
