import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Editor = () => {
  const [tab, setTab] = useState("news");
  return (
    <div className="card-body">
      <h5 className="card-title">Editor</h5>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/editor/news"
            style={{ textDecoration: "none" }}
            className={`nav-link ${tab === "news" ? "active" : ""}`}
            onClick={() => setTab("news")}
          >
            News
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/editor/notifications"
            style={{ textDecoration: "none" }}
            className={`nav-link ${tab === "notifications" ? "active" : ""}`}
            onClick={() => setTab("notifications")}
          >
            Notifications
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Editor;
