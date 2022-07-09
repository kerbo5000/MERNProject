import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'

const Editor = () => {
    return (
        <Card.Body>
          <Card.Title as="h3">Editors Page</Card.Title>
          <Card.Text>
            You must have been assigned an Editor role.
          </Card.Text>
          <Link to="/">
            <Card.Link >Home</Card.Link>
          </Link>
        </Card.Body>
    )
}

export default Editor
