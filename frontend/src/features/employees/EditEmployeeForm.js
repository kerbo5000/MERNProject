import { selectEmployeeById } from "./employeesApiSlice";
import { useSelector } from "react-redux";
import {
  useUpdateEmployeePwdMutation,
  useUpdateEmployeeUsernameMutation,
} from "./employeesApiSlice";
import { useState, useEffect } from "react";
const EditNewsForm = ({ editEmployeeId }) => {
  const [updateEmployeePwd, { isLoading: pwdLoading }] =
    useUpdateEmployeePwdMutation();
  const [updateEmployeeUsername, { isLoading, usernameLoading }] =
    useUpdateEmployeeUsernameMutation();

  const employee = useSelector((state) =>
    selectEmployeeById(state, editEmployeeId)
  );
  const [error, setError] = useState();
  const [success, setSuccess] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const newPassword =
        employee.firstname.slice(employee.firstname.length / 2) +
        employee.lastname.slice(employee.lastname.length / 2);
      await updateEmployeePwd({
        employeeId: editEmployeeId,
        info: { newPassword },
      }).unwrap();
      const newUsername =
        employee.firstname.slice(0, employee.firstname.length / 2) +
        employee.lastname.slice(0, employee.lastname.length / 2);
      const newEmployee = await updateEmployeeUsername({
        employeeId: editEmployeeId,
        info: { newUsername },
      }).unwrap();
      setSuccess({
        firstname: newEmployee.firstname,
        lastname: newEmployee.lastname,
        username: newEmployee.username,
        password: newPassword,
      });
    } catch (err) {
      if (!err?.status) {
        setError("No Server Response");
      } else {
        setError("Wasn't able to update news");
      }
    }
  };
  return (
    <div className="card-body">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success.firstname && (
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Employee info updated</h4>
          <dl class="row">
            <dt class="col-sm-3">Fistname</dt>
            <dd class="col-sm-9">{success.firstname}</dd>
            <dt class="col-sm-3">Lastname</dt>
            <dd class="col-sm-9">{success.lastname}</dd>
            <dt class="col-sm-3">Username</dt>
            <dd class="col-sm-9">{success.username}</dd>
            <dt class="col-sm-3">Password</dt>
            <dd class="col-sm-9">{success.password}</dd>
          </dl>
        </div>
      )}
      {pwdLoading ||
        (usernameLoading && (
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Updating employee...
            </button>
          </div>
        ))}
      <form className="row g-2 mt-2" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Firstname</label>
          <input
            className="form-control"
            type="text"
            value={employee.firstname}
            autoComplete="off"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lastname</label>
          <input
            className="form-control"
            type="text"
            value={employee.lastname}
            autoComplete="off"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            type="text"
            value={employee.username}
            autoComplete="off"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            value="password"
            autoComplete="off"
            disabled
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Reset info
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNewsForm;
