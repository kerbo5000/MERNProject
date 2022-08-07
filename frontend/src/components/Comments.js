import { useLocation,useNavigate } from "react-router-dom"
import { useState } from 'react'
import {useSelector} from 'react-redux'
import {useCommentNewsMutation} from '../features/news/newsApiSlice'
import {useDispatch} from 'react-redux'
import {updateNews} from '../features/news/newsSlice'
import {selectCurrentRoles} from '../features/auth/authSlice'

const Comments = ({comments,newsId}) => {
  const [newComment,setNewComment] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const [commentNews] = useCommentNewsMutation()
  const roles = useSelector(selectCurrentRoles)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const updatedArticle = await commentNews({newsId,newComment}).unwrap()
      dispatch(updateNews(updateNews))
    }catch (err){
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  }
  return (
    <>
      {roles.includes(2001) &&
        <form className="row gy-2 gx-3 align-items-center" onSubmit={handleSubmit}>
          <div className="col-10">
            <input type="text" className="form-control" id="autoSizingInput" placeholder="Leave a comment" value={newComment}
              onChange={(e)=>setNewComment(e.target.value)} autoComplete='off'/>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary" disabled={newComment?false:true}>Comment</button>
          </div>
        </form>}
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
