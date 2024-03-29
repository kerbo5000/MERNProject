import { Link,Outlet } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useState } from "react";
// import Users from './Users'

const Admin = () => {
  const [tab, setTab] = useState("employees");
  return (
    <div className="card-body">
      <h5 className="card-title">Editor</h5>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/admin/employees"
            style={{ textDecoration: "none" }}
            className={`nav-link ${tab === "employees" ? "active" : ""}`}
            onClick={() => setTab("employees")}
          >
            Employees
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/admin/users"
            style={{ textDecoration: "none" }}
            className={`nav-link ${tab === "users" ? "active" : ""}`}
            onClick={() => setTab("users")}
          >
            Users
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Admin;
