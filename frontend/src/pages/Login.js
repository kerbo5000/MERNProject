import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import useGlobalContext from '../hooks/useGlobalContext'
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "user/newsfeed";
  const userRef = useRef();
  const [endpoint, setEndpoint] = useState("user");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const changeTab = (url) => {
    setUser("");
    setPwd("");
    setEndpoint(url);
  };

  useEffect(() => {
    setError("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ user, pwd, endpoint }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      const from = endpoint === 'user' ? '/user/newsfeed' : 'editor/news'
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.originalStatus) {
        setError("No Server Response");
      } else if (err.originalStatus === 400) {
        setError("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    }
  };
  if (isLoading) {
    return (
      <div className="card-body">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Card.Body>
        <Nav variant="tabs" defaultActiveKey={"user"}>
          <Nav.Item>
            <Nav.Link onClick={() => changeTab("user")} eventKey={"user"}>
              User
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => changeTab("employee")}
              eventKey={"employee"}
            >
              Employee
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Body>
      <Card.Body>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={!user || !pwd ? true : false}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </>
  );
};

export default Login;
