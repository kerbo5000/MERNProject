import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  useGetEmployeeNotificationsQuery,
  useDeleteEmployeeNotificationMutation,
} from "../features/notifications/notificationApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../features/auth/authSlice";
const Notifications = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentUserId);
  const {data:notifications, isLoading, isError, isSuccess, error } = useGetEmployeeNotificationsQuery(userId);
  const [deleteEmployeeNotification] = useDeleteEmployeeNotificationMutation();
  let content;
  if (isLoading) {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (isSuccess && notifications?.length) {
    content = (
      <div className="container">
        <ul className="list-group list-group-numbered">
          {notifications.map((notif) => {
            return (
              <Link to={`/news/${notif.newsId}`} style={{ textDecoration: "none", color: "black" }} key={notif._id}>
                <li
                  className="list-group-item d-flex justify-content-between align-items-start"
                  onClick={() => 
                    deleteEmployeeNotification({
                      employeeId: userId,
                      notificationId: notif._id,
                    })
                  }
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{notif.title}</div>
                    {`Users have ${
                      notif.action === "like" ? "liked " : "commented on"
                    } your article`}
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    {notif.amount}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="alert alert-dark" role="alert">
        No notificatons to display
      </div>
    );
  } else if (isError) {
    console.error(error);
    navigate("/login", { state: { from: location }, replace: true });
  }

  return <div className="card-body">{content}</div>;
};

export default Notifications;
