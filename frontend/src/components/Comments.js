import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Alert from 'react-bootstrap/Alert'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useLocation } from "react-router-dom"
import useGlobalContext from '../hooks/useGlobalContext'

import { useState } from 'react'
const Comments = ({comments,id}) => {
  const {commentNews} = useGlobalContext()
  const [newComment,setNewComment] = useState('')
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    commentNews(axiosPrivate,id,newComment,location)
  }
  return (
    <>
      <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSubmit}>
        <div className="col-10">
          <input type="text" className="form-control" id="autoSizingInput" placeholder="Leave a comment" value={newComment}
            onChange={(e)=>setNewComment(e.target.value)}/>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary" disabled={newComment?false:true}>Comment</button>
        </div>
      </form>
      {comments?.length ?
        (<ul className="list-group ">
          {comments.map((comment) => {
            return <li className="list-group-item d-flex justify-content-between align-items-start mt-2" key={comment._id}>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{comment.from}</div>
                {comment.body}
              </div>
            </li>
          })}
      </ul>):(
        <div className="alert alert-secondary mt-2" role="alert">
          No comments
        </div>)}

    </>
  );
}
// <Form>
//   <Form.Group className="mb-3" controlId="formBasicEmail">
//     <Form.Control type="email" placeholder="Enter email" />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Submit
//   </Button>
// </Form>

export default Comments;
