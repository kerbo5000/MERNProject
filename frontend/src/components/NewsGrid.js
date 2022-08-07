import {useLocation,Link } from "react-router-dom"
import {useEffect,useState,useRef,useCallback} from 'react'
import News from './News'

const NewsGrid = ({setNumPage}) => {
  // const location = useLocation()
  // const intObserver = useRef()
  // const lastNewsRef = useCallback(article =>{
  //   if(loading){
  //      return
  //   }
  //   if(intObserver.current){
  //     intObserver.current.disconnect()
  //   }
  //   intObserver.current = new IntersectionObserver(news =>{
  //     if(news[0].isIntersecting && nextPage){
  //       console.log('We are near the last post!')
  //       setNumPage(prev => prev + 1)
  //     }
  //   })
  //   if(article) intObserver.current.observe(article)
  // },[loading,nextPage])

  // const content = (
  //   <div className="row row-cols-1 row-cols-md-3 g-4">
  //     {news.map((article,i) => {
  //       const {title,_id,body,username,likes} = article
  //       if(news.length === i + 1){
  //         return (
  //           <Link to={`/news/${_id}`} style={{textDecoration:'none',color:'black'}} key={article._id} ref={lastNewsRef}>
  //             <div className="col">
  //               <div className="card h-100">
  //                 <div className="card-body">
  //                   <h5 className="card-title">{title}</h5>
  //                   <p className="card-text">{`${body.substring(0,100)}...`}</p>
  //                 </div>
  //                 <div className="card-footer">
  //                   <small className="text-muted">{`liked by ${likes.length == 0 ? 'nobody' : likes.length == 1 ? '1 user':`${likes.length} users`}`}</small>
  //                 </div>
  //               </div>
  //             </div>
  //           </Link>
  //         )
  //       }
  //       return (
  //         <Link to={`/news/${_id}`} style={{textDecoration:'none',color:'black'}} key={article._id}>
  //           <div className="col" >
  //             <div className="card h-100">
  //               <div className="card-body">
  //                 <h5 className="card-title">{title}</h5>
  //                 <p className="card-text">{`${body.substring(0,100)}...`}</p>
  //               </div>
  //               <div className="card-footer">
  //                 <small className="text-muted">{`liked by ${likes.length == 0 ? 'nobody' : likes.length == 1 ? '1 user':`${likes.length} users`}`}</small>
  //               </div>
  //             </div>
  //           </div>
  //         </Link>
  //       )
  //     })}
  //   </div> )

  return (
    // <>
    //   {loading &&
    //     <div className="card-body">
    //       <div className="d-flex justify-content-center">
    //         <div className="spinner-border text-primary" role="status">
    //           <span className="visually-hidden">Loading...</span>
    //         </div>
    //       </div>
    //     </div>}
    //     {!loading &&
    //       <>
    //         {news.length ?
    //           content :
    //           (<div className="card-body">
    //             <p className="card-text">No news to display</p>
    //           </div>)
    //         }
    //       </>
    //     }
    // </>
    <div>EmployeesTable</div>
  )
}

export default NewsGrid;
