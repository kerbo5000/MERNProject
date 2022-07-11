import axios from '../axios/axiosInstances'

const register = async (user,pwd) => {
  const response = await axios.post('/register',
    JSON.stringify({user,pwd}),
    {
      headers:{'Content-Type':'application/json'},
      withCredentials:true
    }
  )
  return response.data
}

const login = async (user,pwd,type) => {
  const response = await axios.post(`/auth/${type}`,
    JSON.stringify({user,pwd}),
    {
      headers:{'Content-Type':'application/json'},
      withCredentials:true
    }
  )
  return response.data
}

const authRequest = {
  register,
  login
}

export default authRequest
