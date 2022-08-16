import { format } from "date-fns";
import { selectCurrentUserId } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteNewsMutation } from "../features/news/newsApiSlice";
const NewsRow = ({
  _id,
  username,
  title,
  likes,
  createdAt,
  employee,
  setEditNewsId,
  setTab,
}) => {
  const userId = useSelector(selectCurrentUserId);
  const [deleteNews] = useDeleteNewsMutation();
  const editNews = () => {
    console.log('hi')
    setEditNewsId(_id);
    setTab("edit");
  };
  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{username}</td>
      <td>{title}</td>
      <td>{likes.length}</td>
      <td>{format(new Date(createdAt), "PP")}</td>
      <td>
        {userId == employee ? (
          <div
            className="btn-group-sm btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <Link to={`/news/${_id}`} className="btn btn-primary">
              Read news
            </Link>
            <button type="button" className="btn btn-warning" onClick={editNews}>
              Edit news
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteNews(_id)}
            >
              Delete news
            </button>
          </div>
        ) : (
          <Link to={`/news/${_id}`} className="btn btn-primary btn-sm">
            Read news
          </Link>
        )}
      </td>
    </tr>
  );
};

export default NewsRow;
