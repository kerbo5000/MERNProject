import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UsersRow from "./UsersRow";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersApiSlice";
import SearchBarUsers from "./SearchBarUsers";
import Pagination from "../../components/Pagination";
import { useGetAllUsersQuery } from "./usersApiSlice";
const UsersTable = ({}) => {
  const { isLoading } = useGetAllUsersQuery();
  const users = useSelector(selectAllUsers);
  const [usersOrder, setUsersOrder] = useState([]);
  const [order, setOrder] = useState("default");
  const [pageNum, setPageNum] = useState(0);
  const [usersDisplay, setUsersDisplay] = useState([]);
  const [nextPage, setNextPage] = useState(true);

  useEffect(() => {
    setPageNum(0);
    if (order === "default") {
      setUsersOrder(users);
    } else if (order === "likesInc") {
      const result = users.sort((a, b) => b.liked.length - a.liked.length);
      setUsersOrder(result);
    } else if (order === "likesDec") {
      const result = users.sort((a, b) => a.liked.length - b.liked.length);
      setUsersOrder(result);
    } else if (order === "dateRecent") {
      const result = users.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUsersOrder(result);
    } else if (order === "dateOld") {
      const result = users.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setUsersOrder(result);
    }
  }, [order, users]);

  useEffect(() => {
    const result = usersOrder.filter(
      (article, index) => Math.floor(index / 5) == pageNum
    );
    if (result.length === 5) {
      setNextPage(true);
    } else {
      setNextPage(false);
    }
    setUsersDisplay(result);
  }, [pageNum, order, usersOrder]);
  return (
    <div className="container">
      <SearchBarUsers
        users={users}
        setUsersOrder={setUsersOrder}
        setPageNum={setPageNum}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Username</th>
            <th scope="col">
              <div>
                Likes
                <div
                  className="btn-group btn-group-sm ps-2"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btnLikesInc"
                    autoComplete="off"
                    checked={order === "likesInc" ? true : false}
                    onChange={() =>
                      order === "likesInc"
                        ? setOrder("default")
                        : setOrder("likesInc")
                    }
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btnLikesInc"
                  >
                    ⥣
                  </label>

                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btnLikesDec"
                    autoComplete="off"
                    checked={order === "likesDec" ? true : false}
                    onChange={() =>
                      order === "likesDec"
                        ? setOrder("default")
                        : setOrder("likesDec")
                    }
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btnLikesDec"
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
          </tr>
        </thead>
        <tbody>
          {usersDisplay.length
            ? usersDisplay.map((user) => <UsersRow {...user} key={user._id} />)
            : null}
        </tbody>
      </table>
      {!usersDisplay.length && (
        <div className="alert alert-dark" role="alert">
          No users to display
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

export default UsersTable;
