import {useRef,useState,useEffect} from 'react'
import axios from '../api/axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import useAuth from '../hooks/useAuth'
import {Link, useNavigate,useLocation} from 'react-router-dom'


function Login() {
  const {setAuth} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const AUTH_URL = '/auth'
  const userRef = useRef()

  const [user,setUser] = useState('')
  const [pwd,setPwd] = useState('')
  const [errMsg,setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    setErrMsg('')
  },[user,pwd])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      const response = await axios.post(AUTH_URL,
        JSON.stringify({user,pwd}),
        {
          headers:{'Content-Type':'application/json'},
          withCredentials:true
        }
      )

      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      setAuth({user,pwd,roles,accessToken})
      setUser('')
      setPwd('')
      navigate(from,{replace:true})
    } catch (err){
      console.log(err.message)
      if(!err?.response){
        setErrMsg('No server response')
      }else if(err.response?.status === 400){
        setErrMsg('Missing username or password')
      }else if(err.response?.status === 401){
        setErrMsg('Unauthorized')
      }else{
        setErrMsg('Login failed')
      }
    }
  }

  return (
    <Card>
      <Card.Header as="h1">Blog</Card.Header>
      <Card.Body>
        <Card.Title as="h3">Login</Card.Title>
        {errMsg &&
          <Alert variant='danger'>
            {errMsg}
          </Alert>
        }
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!user||!pwd ? true: false}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
