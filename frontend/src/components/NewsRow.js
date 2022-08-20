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
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
            <ul className="dropdown-menu">
              <Link to={`/news/${_id}`} style={{ textDecoration: "none", color: "black" }}>
                <li><button className="dropdown-item read" type="button" >Read news</button></li>
              </Link>
              <li><button className="dropdown-item edit" type="button" onClick={editNews}>Edit news</button></li>
              <li><button className="dropdown-item delete" type="button" onClick={() => deleteNews(_id)}>Delete news</button></li>
            </ul>
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
