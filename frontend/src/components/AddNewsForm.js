import { useState, useEffect } from "react";
import { useCreateNewsMutation } from "../features/news/newsApiSlice";
const AddNewsForm = () => {
  const [createNews, { isLoading }] = useCreateNewsMutation();

  const TITLE_REGEX = /^[a-zA-Z0-9\s]{3,40}$/;
  const BODY_REGEX = /^[a-zA-Z0-9\s,.]{100,1000}$/;
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [body, setBody] = useState("");
  const [validBody, setValidBody] = useState(false);
  const [bodyFocus, setBodyFocus] = useState(false);
  const [charatersLeft, setCharatersLeft] = useState(1000);

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);

  useEffect(() => {
    setCharatersLeft(1000 - body.length);
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

  const handleAdd = (e) => {
    e.preventDefault();
    try {
      createNews({ title, body }).unwrap();
      setSuccess("News has been added");
      setTitle();
      setBody();
    } catch (err) {
      if (!err?.originalStatus) {
        setError("No Server Response");
      } else if (err.originalStatus === 400) {
        setError("Missing Title or Body");
      } else if (err.originalStatus === 409) {
        setError("Already have a news with this title");
      } else {
        setError("Wasn't able to create news");
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
            Adding news...
          </button>
        </div>
      )}
      <form className="row g-2 mt-2" onSubmit={handleAdd}>
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
            <div className="alert alert-dark mt-2" role="alert">
              Must be between 3 to 40 characters.
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea
            className="form-control"
            rows="5"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            onFocus={() => setBodyFocus(true)}
            onBlur={() => setBodyFocus(false)}
          ></textarea>
          {bodyFocus && body && (
            <div className="alert alert-dark mt-2" role="alert">
              Must be between 100 to 1000 characters.
              {charatersLeft > 0 ? `You have ${charatersLeft} charaters left`:`You are ${charatersLeft*-1} charaters over the limit`}
            </div>
          )}
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!validTitle || !validBody ? true : false}
          >
            Add News
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewsForm;
