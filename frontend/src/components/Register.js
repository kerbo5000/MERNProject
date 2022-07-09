import {useRef,useState,useEffect} from 'react'
import axios from '../api/axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
function Register() {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
  const REGISTER_URL = '/register'
  const userRef = useRef()

  const [user,setUser] = useState('')
  const [validName,setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd,setPwd] = useState('')
  const [validPwd,setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd,setMatchPwd] = useState('')
  const [validMatch,setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg,setErrMsg] = useState('')
  const [success,setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    setValidName(result)
  },[user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  },[pwd,matchPwd])

  useEffect(() => {
    setErrMsg('')
  },[user,pwd,matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({user,pwd}),
        {
          headers:{'Content-Type':'application/json'},
          withCredentials:true
        }
      )
      setSuccess(true)
      setUser('')
      setPwd('')
      setMatchPwd('')
    } catch (err){
      console.log(err.message)
      if(!err?.response){
        setErrMsg('No server response')
      }else if(err.response?.status === 409){
        setErrMsg('Username Taken')
      }else{
        setErrMsg('Regisration failed')
      }
    }
  }
  return (
          <Card.Body>
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
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  value={user}
                  className={`border border-2 ${validName ?  'border-success': user ?'border-danger':''}`}
                  />
                {(userFocus && user && !validName) &&
                  <Alert variant='dark' className='mt-2'>
                    4 to 24 characters. Must begin with  a letter.
                    Letters, numbers, underscores, hyphens allowed.
                  </Alert>
                }
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPwd(e.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  value={pwd}
                  className={`border border-2 ${validPwd ?  'border-success': pwd ?'border-danger':''}`}
                  />
                {(pwdFocus && !validPwd) &&
                  <Alert variant='dark' className='mt-2'>
                    8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.<br/>
                    Allowed special characters: !@#$%
                  </Alert>
                }
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  value={matchPwd}
                  className={`border border-2 ${validMatch && matchPwd ?  'border-success': matchPwd ?'border-danger':''}`}
                  />
                {(matchFocus && !validMatch) &&
                  <Alert variant='dark' className='mt-2'>
                    Must match the first password input field
                  </Alert>
                }
              </Form.Group>
              <Button variant={success ? "success":"primary"} type="submit" disabled={!validName||!validPwd||!validMatch ? true: false}>
                Submit
              </Button>
            </Form>
          </Card.Body>
  );
}

export default Register;
