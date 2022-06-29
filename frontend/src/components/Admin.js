import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Users from './Users'

const Admin = () => {
    return (
      <Card>
        <Card.Header as="h1">Blog</Card.Header>
        <Card.Body>
          <Card.Title as="h3">Admins Page</Card.Title>
        </Card.Body>
        <Users />
        <Card.Body>
          <Link to="/">
            <Card.Link >Home</Card.Link>
          </Link>
        </Card.Body>
    </Card>
    )
}

export default Admin
