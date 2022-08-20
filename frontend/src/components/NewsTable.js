import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NewsRow from "./NewsRow";
import { useSelector } from "react-redux";
import { useGetAllNewsQuery } from "../features/news/newsApiSlice";
import { selectAllNews } from "../features/news/newsApiSlice";
import SearchBar from "./SearchBar";
import AddNewsForm from "./AddNewsForm";
import Pagination from "./Pagination";
import EditNewsForm from "./EditNewsForm";
const NewsTable = () => {
  const { isloading, isSuccess, isError, error } = useGetAllNewsQuery();
  const news = useSelector(selectAllNews);
  const [newsOrder, setNewsOrder] = useState([]);
  const [order, setOrder] = useState("default");
  const [pageNum, setPageNum] = useState(0);
  const [newsDisplay, setNewsDisplay] = useState([]);
  const [nextPage, setNextPage] = useState(true);
  const [editNewsId, setEditNewsId] = useState();
  const [tab, setTab] = useState("add");

  useEffect(() => {
    setPageNum(0);
    if (order === "default") {
      setNewsOrder(news);
    } else if (order === "likesInc") {
      const result = news.sort((a, b) => b.likes.length - a.likes.length);
      setNewsOrder(result);
    } else if (order === "likesDec") {
      const result = news.sort((a, b) => a.likes.length - b.likes.length);
      setNewsOrder(result);
    } else if (order === "dateRecent") {
      const result = news.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNewsOrder(result);
    } else if (order === "dateOld") {
      const result = news.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setNewsOrder(result);
    }
  }, [order, news]);

  useEffect(() => {
    const result = newsOrder.filter(
      (article, index) => Math.floor(index / 5) == pageNum
    );
    if (result.length === 5) {
      setNextPage(true);
    } else {
      setNextPage(false);
    }
    setNewsDisplay(result);
  }, [pageNum, order, newsOrder]);

  useEffect(() => {
    setOrder("default");
    if (tab != "edit") {
      setEditNewsId();
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
              !editNewsId ? "disabled" : ""
            }`}
          >
            {" "}
            Edit News
          </a>
        </li>
      </ul>
      {tab === "add" ? (
        <AddNewsForm />
      ) : (
        <EditNewsForm editNewsId={editNewsId} />
      )}
      <SearchBar news={news} setNewsOrder={setNewsOrder} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Username</th>
            <th scope="col">Title</th>
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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsDisplay.length ?
            newsDisplay.map((article) => (
              <NewsRow
                {...article}
                key={article._id}
                setEditNewsId={setEditNewsId}
                setTab={setTab}
              />
            )) : null}
        </tbody>
      </table>
      {!newsDisplay.length && (
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

export default NewsTable;
