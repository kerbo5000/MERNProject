import { useNavigate, Link } from "react-router-dom"
import {useState,useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import News from './News'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
const Home = () => {
    const [news,setNews] = useState()
    const {auth,setAuth} = useAuth()
    const navigate = useNavigate()

    const [search,setSearch] = useState({
                                        inputText:'',
                                        inputRadio:''
                                        })
    useEffect(()=>{
      let isMounted = true
      const controller = new AbortController()
      const getNews = async () => {
        try{
          const response = await axiosPrivate.get('/news',{
            signal: controller.signal
          })
          isMounted && setNews(response.data)
        } catch(err){
          console.error(err)
          navigate('/login',{state:{from:location},replace:true})
        }
      }
      getNews()
      return () => {
        isMounted = false
        controller.abort()
      }
    },[])
    const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        setAuth({})
        navigate('/linkpage')
    }

    const handleInput = (e) => {
      setSearch(prevSearch => {
        return {
                ...prevSearch,
                [e.target.name]:e.target.value
              }
      })
    }

    return (
      <>
        <Card.Body>
          <Card.Title as="h3">Home</Card.Title>
        </Card.Body>
        <Card.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Search
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  onChange={handleInput()}
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
                    onChange={handleInput()}
                  />
                  <Form.Check
                    type="radio"
                    label="title"
                    name="inputRadio"
                    value="title"
                    onChange={handleInput()}
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Sign in</Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
        {news?.length ?
          <CardGroup>
            ({news.map((article) => {
              return <News key={article.id} {...article}/>
            })}
          </CradGroup>):
          (<Card.Body>
            <Card.Text>
              No news to display
            </Card.Text>
          <Card.Body>
        )}
        <Button variant="primary" onClick={logout} >Sign Out</Button>
      </>
    )
}

export default Home
