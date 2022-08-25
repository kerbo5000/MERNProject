import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useDeleteEmployeeMutation } from "../features/employees/employeesApiSlice";
const EmployeesRow = ({
  _id,
  username,
  lastname,
  firstname,
  roles,
  news,
  createdAt,
  setEditEmployeeId,
  setTab,
}) => {
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const editEmployee = () => {
    setEditEmployeeId(_id);
    setTab("edit");
  };
  console.log(createdAt)
  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{username}</td>
      <td>{`${lastname}, ${firstname}`}</td>
      <td>{Object.keys(roles).join(', ')}</td>
      <td>{news.length}</td>
      <td>{format(new Date(createdAt), "PP")}</td>
      <td>
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
          <ul className="dropdown-menu">
            <Link to={`/news/employee/${_id}`} style={{ textDecoration: "none", color: "black" }}>
              <li><button className="dropdown-item read" type="button" >Employee page</button></li>
            </Link>
            <li><button className="dropdown-item edit" type="button" onClick={editEmployee}>Reset info</button></li>
            <li><button className="dropdown-item delete" type="button" onClick={() => deleteEmployee(_id)}>Delete employee</button></li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default EmployeesRow;
