import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
const Comments = ({comments}) => {
  return (
    <>
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="leave a comment"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className="mb-2">
              Comment
            </Button>
          </Col>
        </Row>
      </Form>
      {comments?.length ?
        (<ListGroup>
          {comments.map((comment) => {
            return <ListGroup.Item key={comment.id}>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{comment.from}</div>
                {comment.body}
              </div>
            </ListGroup.Item>
          })}
      </ListGroup>):()}

    </>
  );
}
// <Form>
//   <Form.Group className="mb-3" controlId="formBasicEmail">
//     <Form.Control type="email" placeholder="Enter email" />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Submit
//   </Button>
// </Form>

export default Comments;
