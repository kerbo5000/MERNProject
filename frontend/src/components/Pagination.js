import React from 'react'

const Pagination = ({pageNum,setPageNum,nextPage}) => {
  return (
     <nav aria-label="Page navigation example" className='mt-2'>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${pageNum === 0 ? 'disabled': ''}`} onClick={() => setPageNum(prev => prev - 1)}>
          <a className="page-link">Previous</a>
        </li>
        <li className="page-item"><a className="page-link">{pageNum+1}</a></li>
        <li className={`page-item ${!nextPage ? 'disabled': ''}`} onClick={() => setPageNum(prev => prev + 1)}>
          <a className="page-link">Next</a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination