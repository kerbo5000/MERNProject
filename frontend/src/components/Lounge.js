import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
const Lounge = () => {
    return (
        <Card>
          <Card.Header as="h1">Blog</Card.Header>
          <Card.Body>
            <Card.Title as="h3">The Lounge</Card.Title>
            <Card.Text>
              Admins and Editors can hang out here.
            </Card.Text>
            <Link to="/">
              <Card.Link >Home</Card.Link>
            </Link>
          </Card.Body>
      </Card>
    )
}

export default Lounge
