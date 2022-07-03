import { useNavigate, Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/authProvider"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
const Home = () => {
    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        setAuth({})
        navigate('/linkpage')
    }

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Header as="h1">Blog</Card.Header>
        <Card.Body>
          <Card.Title as="h3">Home</Card.Title>
          <Card.Text>
            You are logged in!
          </Card.Text>
        </Card.Body>
        <Link to="/editor">
          <Card.Body>
              <Card.Link>Go to the Editor page</Card.Link>
          </Card.Body>
        </Link>
        <Link to="/admin">
          <Card.Body>
              <Card.Link>Go to the Admin page</Card.Link>
          </Card.Body>
        </Link>
        <Link to="/lounge">
          <Card.Body>
              <Card.Link>Go to the lounge</Card.Link>
          </Card.Body>
        </Link>
        <Link to="/linkpage">
          <Card.Body>
              <Card.Link>Go to the link page</Card.Link>
          </Card.Body>
        </Link>
        <Button variant="primary" onClick={logout} >Sign Out</Button>
      </Card>
    )
}

export default Home
