import {useLocation } from "react-router-dom"
import {useEffect,useState,useRef,useCallback} from 'react'
import News from './News'
import {useGetNewsQuery,} from '../features/news/newsApiSlice'
import {selectNewsIds} from '../features/news/newsSlice'
import {useSelector} from 'react-redux'

const NewsContainer = ({setNumPage,nextPage}) => {
  const intObserver = useRef()
  const {isLoading} = useGetNewsQuery()
  const newsIds = useSelector(selectNewsIds)
  const lastNewsRef = useCallback(article =>{
    if(isLoading){
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
  },[isLoading,nextPage])
  
  const content = (
              <div className="container">
                {newsIds.map((newsId,i) => {
                  if(newsIds.length === i + 1){
                    return <News key={newsId} ref={lastNewsRef} newsId={newsId}/>
                  }
                  return <News key={newsId} newsId={newsId}/>
                })}
            </div>
            )
  return (
    <div className="card-body">
      {news.length ?
        content :
        (
          <p className="card-text">No news to display</p>
        )
      }
    </div>
  )
}

export default NewsContainer;
