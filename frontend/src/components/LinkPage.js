import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
const LinkPage = () => {
    return (
      <>
          <Card.Body>
            <Card.Title as="h3">Link</Card.Title>
            <Card.Text>
              You are logged in!
            </Card.Text>
          </Card.Body>
            <Card.Body>
              <Card.Title as="h4">Public</Card.Title>
                <ListGroup className="list-group-flush">
                  <Link to="/login">
                    <ListGroup.Item>Login</ListGroup.Item>
                  </Link>
                  <Link to="/register">
                    <ListGroup.Item>Register</ListGroup.Item>
                  </Link>
                </ListGroup>
            </Card.Body>
            <Card.Body>
              <Card.Title as="h4">Private</Card.Title>
                <ListGroup className="list-group-flush">
                  <Link to="/">
                    <ListGroup.Item>Home</ListGroup.Item>
                  </Link>
                  <Link to="/editor">
                    <ListGroup.Item>Editors Page</ListGroup.Item>
                  </Link>
                  <Link to="/admin">
                    <ListGroup.Item>Admin Page</ListGroup.Item>
                  </Link>
                </ListGroup>
            </Card.Body>
        </>
    )
}

export default LinkPage
