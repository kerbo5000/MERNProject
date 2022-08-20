import { useEffect, useState } from "react";

const SearchBar = ({ setNewsOrder, news }) => {
  const [search, setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (!search) {
      return setNewsOrder(news);
    }
    const result = news.filter(
      (article) =>
        article.title.includes(search) || article.username.includes(search) || article._id.includes(search)
    );
    setNewsOrder(result);
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

export default SearchBar;
