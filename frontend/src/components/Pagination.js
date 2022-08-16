import React from 'react'

const Pagination = ({pageNum,setPageNum,nextPage}) => {
  return (
     <nav aria-label="Page navigation example" className='mt-2'>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${pageNum === 0 ? 'disabled': ''}`} >
          <button className="page-link" disabled={pageNum === 0} onClick={() => setPageNum(prev => prev - 1)}> Previous</button>
        </li>
        <li className="page-item"><a className="page-link">{pageNum+1}</a></li>
        <li className={`page-item ${!nextPage ? 'disabled': ''}`}  >
          <button className="page-link" disabled={!nextPage} onClick={() => setPageNum(prev => prev + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination