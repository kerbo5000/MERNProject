import { useState, useEffect } from "react";
import { useCreateEmployeeMutation } from "../features/employees/employeesApiSlice";
const AddNewsForm = () => {
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const [error, setError] = useState();
  const [success, setSuccess] = useState({
    fistname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    setError();
    setSuccess();
  }, [firstname, lastname]);

  const handleAdd = (e) => {
    e.preventDefault();
    try {
      const newEmployee = createEmployee({ firstname,lastname}).unwrap();
      setSuccess(newEmployee);
      setFirstname();
      setLastname();
    } catch (err) {
      if (!err?.originalStatus) {
        setError("No Server Response");
      } else if (err.originalStatus === 400) {
        setError("Missing firstname or lastname");
      } else {
        setError("Wasn't able to create employee");
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
      {success && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">New employee has been added</h4>
          <dl className="row">
            <dt className="col-sm-3">Fistname</dt>
            <dd className="col-sm-9">{success.fistname}</dd>
            <dt className="col-sm-3">Lastname</dt>
            <dd className="col-sm-9">{success.lastname}</dd>
            <dt className="col-sm-3">Username</dt>
            <dd className="col-sm-9">{success.username}</dd>
            <dt className="col-sm-3">Password</dt>
            <dd className="col-sm-9">{success.password}</dd>
          </dl>
        </div>
      )}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Adding employee...
          </button>
        </div>
      )}
      <form className="row g-2 mt-2" onSubmit={handleAdd}>
        <div className="mb-3">
          <label className="form-label">Fistname</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lastname</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!firstname || !lastname ? true : false}
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewsForm;
