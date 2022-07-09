import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
const Missing = () => {
    return (
          <Card.Body>
            <Card.Title as="h3">Oops!</Card.Title>
            <Card.Text>
              Page Not Found
            </Card.Text>
            <Link to="/">
              <Card.Link >Visit Our Homepage</Card.Link>
            </Link>
          </Card.Body>
    )
}

export default Missing
