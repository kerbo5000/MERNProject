import { useEffect, useState } from "react";

const SearchBarEmployees = ({ setEmployeesOrder, employees }) => {
  const [search, setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (!search) {
      return setEmployeesOrder(employees);
    }
    const result = employees.filter(
      (employee) =>
        employee.username.includes(search) || employee.firstnsme.includes(search) || employee.lastname.includes(search)
    );
    setEmployeesOrder(result);
  }, [search]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Search</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="title, username, id"
        />
      </div>
    </form>
  );
};

export default SearchBarEmployees;
