import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { logout as logoutAuth } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch();


  const signOut = async () => {
    try{
      await logout().unwrap()
      dispatch(logoutAuth())
      navigate('/')
    } catch (err){
      navigate('/')
    }
  }
  
  return (
    <Card.Header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {token ? (
              <Nav className="ms-auto" defaultActiveKey={"user"}>
                <Nav.Item>
                  <Nav.Link as={Link} to="user/newsfeed" eventKey="user">
                    User
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/editor/news" eventKey="editor">
                    Editor
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/admin" eventKey="admin">
                    Admin
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/settings" eventKey="lsettings">
                    Settings
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={signOut} eventKey="logout">
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            ) : (
              <Nav className="ms-auto" defaultActiveKey={"login"}>
                <Nav.Item>
                  <Nav.Link as={Link} to="/" eventKey="login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/register" eventKey="register">
                    Register
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Card.Header>
  );
};

export default Header;
