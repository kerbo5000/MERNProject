import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth'
const Header = () => {
  const {auth} = useAuth()
  return (
    <Card.Header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
             {auth?.user ? (
               <Nav className="ms-auto">
                  <Nav.Item>
                   <Nav.Link as={Link} to='/' eventKey='home'>Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                   <Nav.Link as={Link} to='/editor' eventKey='editor'>Editor</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                   <Nav.Link as={Link} to='/admin' eventKey='admin'>Admin</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                   <Nav.Link as={Link} to='/settings' eventKey='login'>Settings</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                   <Nav.Link as={Link} to='/logout' eventKey='logout'>Logout</Nav.Link>
                  </Nav.Item>
                </Nav>
               ) : (
                 <Nav className="ms-auto">
                   <Nav.Item>
                    <Nav.Link as={Link} to='/login' eventKey='login'>Login</Nav.Link>
                   </Nav.Item>
                   <Nav.Item>
                    <Nav.Link as={Link} to='/register' eventKey='register'>Register</Nav.Link>
                   </Nav.Item>
                </Nav>
               )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Card.Header>
  );
}


export default Header;
