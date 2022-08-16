import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCommentNewsMutation } from "../features/news/newsApiSlice";
import { selectCurrentRoles } from "../features/auth/authSlice";
import { format } from "date-fns";

const Comments = ({ comments, newsId }) => {
  const [newComment, setNewComment] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [commentNews] = useCommentNewsMutation();
  const roles = useSelector(selectCurrentRoles);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await commentNews({ newsId, comment: newComment }).unwrap();
      setNewComment("");
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  return (
    <>
      {roles.includes(2001) && (
        <form
          className="row gy-2 gx-3 align-items-center mb-2"
          onSubmit={handleSubmit}
        >
          <div className="col-9">
            <input
              type="text"
              className="form-control"
              id="autoSizingInput"
              placeholder="Leave a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={newComment ? false : true}
            >
              Comment
            </button>
          </div>
        </form>
      )}
      {comments?.length ? (
        <ul className="list-group">
          {comments.map((comment) => {
            return (
              <li className="list-group-item" key={comment._id}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{comment.username}</h5>
                  <small>{format(new Date(comment.createdAt), "PP")}</small>
                </div>
                <p className="mb-1">{comment.body}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="alert alert-secondary mt-2" role="alert">
          No comments
        </div>
      )}
    </>
  );
};

export default Comments;
