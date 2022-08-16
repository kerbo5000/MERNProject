import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import SearchResult from "../components/SearchResult";

const User = () => {
  const [tab, setTab] = useState("newsfeed");
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const handleSubmit = (e) => e.preventDefault();

  return (
    <div className="card-body">
      <h5 className="card-title">Home</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Search</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
        </div>
      </form>
      {search && searchFocus && (
        <div
          className="d-flex justify-content-center"
          style={{ position: "relative" }}
        >
          <SearchResult search={search} />
        </div>
      )}
      <ul className="nav nav-tabs mt-2">
        <li className="nav-item">
          <Link
            to="/newsfeed"
            className={`nav-link ${tab === "newsfeed" ? "active" : ""}`}
            aria-current="page"
            onClick={() => setTab("newsfeed")}
          >
            News Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/favorites"
            className={`nav-link ${tab === "favorites" ? "active" : ""}`}
            onClick={() => setTab("favorites")}
          >
            Favorites
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default User;
