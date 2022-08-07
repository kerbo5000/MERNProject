import {useRef,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import {useRegisterMutation} from '../features/auth/authApiSlice'
function Register() {

  const [register,{isLoading,isSuccess,isError}] = useRegisterMutation()

  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

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

  const [error,setError] = useState('')

  useEffect(() => {
    userRef.current?.focus()
  },[])

  useEffect(() => {
    setError('')
  },[user,pwd])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      await register({user,pwd}).unwrap()
    }catch(err){
      if(!err?.originalStatus){
        setError('No Server Response')
      } else if(err.originalStatus === 400){
        setError('Missing Username or Password')
      } else if(err.originalStatus === 409){
        setError('Username is taken')
      } else {
        setError('Registration Failed')
      }
    }
  }
  

  if(isLoading){
    return (
      <div className="card-body">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      )
  }
  if(isSuccess){
    return (
      <div className="card-body">
        <h5 className="card-title">Registration done</h5>
        <p className="card-text">Your account has been created</p>
        <Link to="/">
          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="button" className="btn btn-primary btn-lg">Login</button>
          </div>
        </Link>
      </div>
      )
  }
  return (
          <Card.Body>
            {error &&
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            }
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
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
              <Form.Group className="mb-3">
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
              <Form.Group className="mb-3">
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
              <Button type="submit" disabled={!validName||!validPwd||!validMatch ? true: false}>
                Submit
              </Button>
            </Form>
          </Card.Body>
  );
}

export default Register;
