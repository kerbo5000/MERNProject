import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
// import Users from './Users'

const Admin = () => {
    return (
      <>
        <Card.Body>
          <Card.Title as="h3">Admins Page</Card.Title>
        </Card.Body>
        {/* <Users />*/}
        <Card.Body>
          <Link to="/">
            <Card.Link >Home</Card.Link>
          </Link>
        </Card.Body>
      </>
    )
}

export default Admin
