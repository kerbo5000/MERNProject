import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EmployeesRow from "./EmployeesRow";
import { useSelector } from "react-redux";
import { useGetAllEmployeesQuery } from "../features/employees/employeesApiSlice";
import { selectAllEmployees } from "../features/employees/employeesApiSlice";
import SearchBarEmployees from "./SearchBarEmployees";
import AddEmployeeForm from "./AddEmployeeForm";
import Pagination from "./Pagination";
import EditEmployeeForm from "./EditEmployeeForm";
const EmployeesTable = () => {
  const { isloading, isSuccess, isError, error } = useGetAllEmployeesQuery();
  const employees = useSelector(selectAllEmployees);
  const [employeesOrder, setEmployeesOrder] = useState([]);
  const [order, setOrder] = useState("default");
  const [pageNum, setPageNum] = useState(0);
  const [employeesDisplay, setEmployeesDisplay] = useState([]);
  const [nextPage, setNextPage] = useState(true);
  const [editEmployeeId, setEditEmployeeId] = useState();
  const [tab, setTab] = useState("add");

  useEffect(() => {
    setPageNum(0);
    if (order === "default") {
      setEmployeesOrder(employees);
    } else if (order === "newsInc") {
      const result = employees.sort((a, b) => b.news.length - a.news.length);
      setEmployeesOrder(result);
    } else if (order === "newsDec") {
      const result = employees.sort((a, b) => a.news.length - b.news.length);
      setEmployeesOrder(result);
    } else if (order === "dateRecent") {
      const result = employees.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setEmployeesOrder(result);
    } else if (order === "dateOld") {
      const result = employees.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setEmployeesOrder(result);
    }
  }, [order, employees]);

  useEffect(() => {
    const result = employeesOrder.filter(
      (_ , index) => Math.floor(index / 5) == pageNum
    );
    if (result.length === 5) {
      setNextPage(true);
    } else {
      setNextPage(false);
    }
    setEmployeesDisplay(result);
  }, [pageNum, order, employeesOrder]);

  useEffect(() => {
    setOrder("default");
    if (tab != "edit") {
      setEditEmployeeId();
    }
  }, [tab]);

  
  return (
    <div className="container">
      <ul className="nav nav-tabs mt-2">
        <li className="nav-item">
          <a
            className={`nav-link ${tab === "add" ? "active" : ""}`}
            onClick={() => setTab("add")}
          >
            {" "}
            Add news
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tab === "edit" ? "active" : ""} ${
              !editEmployeeId ? "disabled" : ""
            }`}
          >
            {" "}
            Edit News
          </a>
        </li>
      </ul>
      {tab === "add" ? (
        <AddEmployeeForm />
      ) : (
        <EditEmployeeForm editEmployeeId={editEmployeeId} />
      )}
      <SearchBarEmployees employees={employees} setEmployeesOrder={setEmployeesOrder} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Username</th>
            <th scope="col">Full name</th>
            <th scope="col">Role</th>
            <th scope="col">
              <div>
                News
                <div
                  className="btn-group btn-group-sm ps-2"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btnNewsInc"
                    autoComplete="off"
                    checked={order === "newsInc" ? true : false}
                    onChange={() =>
                      order === "newsInc"
                        ? setOrder("default")
                        : setOrder("newsInc")
                    }
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btnNewsInc"
                  >
                    ⥣
                  </label>

                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btnNewsDec"
                    autoComplete="off"
                    checked={order === "newsDec" ? true : false}
                    onChange={() =>
                      order === "newsDec"
                        ? setOrder("default")
                        : setOrder("newsDec")
                    }
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btnNewsDec"
                  >
                    ⥥
                  </label>
                </div>
              </div>
            </th>
            <th scope="col">
              <div>
                Date
                <div
                  className="btn-group btn-group-sm ps-2"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btnDateRecent"
                    autoComplete="off"
                    checked={order === "dateRecent" ? true : false}
                    onChange={() =>
                      order === "dateRecent"
                        ? setOrder("default")
                        : setOrder("dateRecent")
                    }
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btnDateRecent"
                  >
                    ⥣
                  </label>

                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btnDateOld"
                    autoComplete="off"
                    checked={order === "dateOld" ? true : false}
                    onChange={() =>
                      order === "dateOld"
                        ? setOrder("default")
                        : setOrder("dateOld")
                    }
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btnDateOld"
                  >
                    ⥥
                  </label>
                </div>
              </div>
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeesDisplay.length ?
            employeesDisplay.map((employee) => {
              console.log(employee)
              return (
              <EmployeesRow
                {...employee}
                key={employee._id}
                setEditEmployeeId={setEditEmployeeId}
                setTab={setTab}
              />
            )}) : null}
        </tbody>
      </table>
      {!employeesDisplay.length && (
        <div className="alert alert-dark" role="alert">
          No news to display
        </div>
      )}
      <Pagination
        pageNum={pageNum}
        setPageNum={setPageNum}
        nextPage={nextPage}
      />
    </div>
  );
};

export default EmployeesTable;
