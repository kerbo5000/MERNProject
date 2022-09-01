import { useEffect, useState } from "react";

const SearchBarUsers = ({ setUsersOrder,users, setPageNum }) => {
  const [search, setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    setPageNum(0)
    if (!search) {
      return setUsersOrder(users);
    }
    const result =users.filter(
      (user) =>
       user.username.includes(search) || user._id.includes(search)
    );
    setUsersOrder(result);
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
          placeholder="username, id"
        />
      </div>
    </form>
  );
};

export default SearchBarUsers;
