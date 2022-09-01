import { useState, useEffect } from "react";
import { useCreateEmployeeMutation } from "./employeesApiSlice";
const AddNewsForm = () => {
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  useEffect(() => {
    setError('');
  }, [firstname, lastname]);

  const handleAdd = async(e) => {
    e.preventDefault();
    try {
      const newEmployee = await createEmployee({ firstname,lastname}).unwrap();
      setSuccess({firstname,lastname,username:newEmployee.username,password:newEmployee.password});
      setFirstname('');
      setLastname('');
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
      {console.log(success)}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success?.firstname && (
        <div className="alert alert-success w-50" role="alert">
          <h4 className="alert-heading">New employee has been added</h4>
          <dl className="row">
            <dt className="col-sm-3">Fistname</dt>
            <dd className="col-sm-2">{success.firstname}</dd>
            <div className="w-100"></div>
            <dt className="col-sm-3">Lastname</dt>
            <dd className="col-sm-2">{success.lastname}</dd>
            <div className="w-100"></div>
            <dt className="col-sm-3">Username</dt>
            <dd className="col-sm-2">{success.username}</dd>
            <div className="w-100"></div>
            <dt className="col-sm-3">Password</dt>
            <dd className="col-sm-2">{success.password}</dd>
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
