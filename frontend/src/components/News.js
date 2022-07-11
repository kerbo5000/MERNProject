import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Comments from './Comments'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

const News = ({_id,username,title,body,comments,likes,likeNews}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="clearfix mt-2">
      <div className="card">
        <h5 className="card-header">{title}</h5>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p className="fs-6">{body}</p>
            <footer className="blockquote-footer"><cite title="Source Title" className="fs-6">{username}</cite></footer>
          </blockquote>
          <div className="btn-group mt-2" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-primary shadow-none" onClick={likeNews}>
              Like <span className="badge text-bg-secondary">{likes}</span>
            </button>
            <button className="btn btn-primary shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#comments${_id}`} aria-expanded="false" aria-controls={`comments${_id}`}>
              Comments
            </button>
          </div>
        </div>
        <div className="card-footer collapse" id={`comments${_id}`}>
          <div className="card card-body">
            <Comments comments={comments} id={_id} />
          </div>
        </div>
      </div>
    </div>
  )
}


export default News;
