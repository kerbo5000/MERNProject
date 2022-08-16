import { selectNewsById } from "../features/news/newsApiSlice";
import { useSelector } from "react-redux";
import { useUpdateNewsMutation } from "../features/news/newsApiSlice";
import { useState, useEffect } from "react";
const EditNewsForm = ({ editNewsId }) => {
  const [updateNews, { isLoading }] = useUpdateNewsMutation();
  const news = useSelector((state) => selectNewsById(state, editNewsId));

  const TITLE_REGEX = /^[a-zA-Z0-9-_\s]{3,40}$/;
  const BODY_REGEX = /^[a-zA-Z][a-zA-Z0-9,.\s]{100,400}$/;
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [body, setBody] = useState(news.body);
  const [validBody, setValidBody] = useState(false);
  const [bodyFocus, setBodyFocus] = useState(false);
  const [charatersLeft, setCharatersLeft] = useState(400 - body.length);

  const [title, setTitle] = useState(news.title);
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  useEffect(() => {
    setCharatersLeft(400 - body.length);
    const result = BODY_REGEX.test(body);
    setValidBody(result);
  }, [body]);

  useEffect(() => {
    const result = TITLE_REGEX.test(title);
    setValidTitle(result);
  }, [title]);

  useEffect(() => {
    setError();
    setSuccess();
  }, [title, body]);

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      updateNews({ newsId: editNewsId, info: { title, body } }).unwrap();
      setSuccess("News has been updated");
    } catch (err) {
      if (!err?.originalStatus) {
        setError("No Server Response");
      } else if (err.originalStatus === 400) {
        setError("Missing Title or Body");
      } else if (err.originalStatus === 403) {
        setError("Forbidden to update this news");
      } else if (err.originalStatus === 409) {
        setError("Already have a news with this title");
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
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
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
            Updating news...
          </button>
        </div>
      )}
      <form className="row g-2 mt-2" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoComplete="off"
            onFocus={() => setTitleFocus(true)}
            onBlur={() => setTitleFocus(false)}
          />
          {titleFocus && title && !validTitle && (
            <div className="alert alert-dark" role="alert">
              Must be between 3 to 40 characters.
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            onFocus={() => setBodyFocus(true)}
            onBlur={() => setBodyFocus(false)}
          ></textarea>
          {bodyFocus && body && !validBody && (
            <div className="alert alert-dark" role="alert">
              Must be between 100 to 400 characters.
              {`You have ${charatersLeft} charaters left`}
            </div>
          )}
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!validTitle || !validBody ? true : false}
          >
            Edit News
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNewsForm;
