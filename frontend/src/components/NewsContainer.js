import {useLocation } from "react-router-dom"
import {useEffect,useState,useRef,useCallback} from 'react'
import useGlobalContext from '../hooks/useGlobalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useNews from '../hooks/useNews'
import News from './News'

const NewsContainer = ({setNumPage}) => {
  const {newsState,test,reset} = useGlobalContext()
  const {loading,news,error,nextPage} = newsState
  // const [numPage,setNumPage] = useState(0)
  // const axiosPrivate = useAxiosPrivate()
  const location = useLocation()
  const intObserver = useRef()
  const lastNewsRef = useCallback(article =>{
    if(loading){
       return
    }
    if(intObserver.current){
      intObserver.current.disconnect()
    }
    intObserver.current = new IntersectionObserver(news =>{
      if(news[0].isIntersecting && nextPage){
        console.log('We are near the last post!')
        setNumPage(prev => prev + 1)
      }
    })
    if(article) intObserver.current.observe(article)
  },[loading,nextPage])

  const content = news.map((article,i) => {
    if(news.length === i + 1){
      return <News key={article._id} ref={lastNewsRef} {...article}/>
    }
    return <News key={article._id} {...article}/>
  })

  // useEffect(()=>{
  //   test(axiosPrivate,numPage)
  // },[numPage])

  // if(loading){
  //   return (
  //     <div className="card-body">
  //
  //     </div>
  //     )
  // }
  return (
    <>
      {loading &&
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> }
      {news?.length ? (
        <div className="container overflow-auto">
          {content}
        </div>
      ):(
        <div className="card-body">
          <p className="card-text">No news to display</p>
        </div>
      )}
    </>
  )
}

export default NewsContainer;
