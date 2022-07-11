import { useNavigate, Link, useLocation } from "react-router-dom"
import {useState,useEffect} from 'react'
import useGlobalContext from '../hooks/useGlobalContext'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import News from './News'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
const Home = () => {
    // const [news,setNews] = useState()
    const {newsState,getNews,reset,likeNews,searchNews} = useGlobalContext()
    const {loading,error,success,news} = newsState
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const [search,setSearch] = useState({
                                        inputText:'',
                                        inputRadio:''
                                        })
    // const [likes,setLikes] = useState([])
    useEffect(()=>{
      getNews(axiosPrivate,location)
      return () => {
        reset('news')
      }
    },[])

    const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        // setAuth({})
        navigate('/linkpage')
    }


    const handleInput = (e) => {
      setSearch(prevSearch => {
        return {...prevSearch,
                [e.target.name]:e.target.value
              }
      })
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      searchNews(axiosPrivate,location,search)
    }
    return (
      <>
        <Card.Body>
          <Card.Title as="h3">Home</Card.Title>
        </Card.Body>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Search
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  onChange={handleInput}
                  value={search.inputText}
                  name="inputText"
                  />
              </Col>
            </Form.Group>
            <fieldset>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column sm={2}>
                  Filter
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="username"
                    name="inputRadio"
                    value="username"
                    onChange={handleInput}
                  />
                  <Form.Check
                    type="radio"
                    label="title"
                    name="inputRadio"
                    value="title"
                    onChange={handleInput}
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Search</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
        {loading ? (
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ): news?.length ?  (<div className="container">
            {news.map((article) => {
              return <News key={article._id} {...article} likeNews={() => likeNews(axiosPrivate,article._id,location)}/>
            })}
          </div>):(<Card.Body>
            <Card.Text>
              No news to display
            </Card.Text>
          </Card.Body>
          )}
        <Button variant="primary" onClick={logout} >Sign Out</Button>
      </>
    )
}

export default Home
