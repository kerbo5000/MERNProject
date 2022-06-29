import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Card>
        <Card.Header as="h1">Blog</Card.Header>
        <Card.Body>
          <Card.Title as="h3">Unauthorized</Card.Title>
          <Card.Text>
            You do not have access to the requested page.
          </Card.Text>
          <Button variant="primary" onClick={goBack} >Go Back</Button>
        </Card.Body>
    </Card>
    )
}

export default Unauthorized
