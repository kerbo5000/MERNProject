import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'
import Comments from './Comments'

const News = ({id,username,title,body,comments,likes}) => {
  const [open, setOpen] = useState(false);
  return (
      <Card>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              {body}
            </p>
            <footer className="blockquote-footer">
              By <cite title="Source Title">{username}</cite>
            </footer>
          </blockquote>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">
            Like <Badge bg="secondary">{likes}</Badge>
          </Button>
          <>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Comments
            </Button>
            <Collapse in={open}>
              <Comments comments={comments}/>
            </Collapse>
          </>
        </Card.Footer>
      </Card>
  )
}


export default News;
