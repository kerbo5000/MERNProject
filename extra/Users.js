import {useState,useEffect} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {useNavigate,useLocation} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
const Users = () => {
  const [users,setUsers] = useState()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
    let isMounted = true
    const controller = new AbortController()
    const getUsers = async () => {
      try{
        const response = await axiosPrivate.get('/users',{
          signal: controller.signal
        })
        isMounted && setUsers(response.data)
      } catch(err){
        console.error(err)
        navigate('/login',{state:{from:location},replace:true})
      }
    }
    getUsers()
    return () => {
      isMounted = false
      controller.abort()
    }
  },[])
  return (
      <Card.Body>
        <Card.Title>Users</Card.Title>
        {users?.length
          ?(
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Roles</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user,i)=>
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{user?.username}</td>
                    <td>{Object.values(user?.roles).filter(Boolean).map((role) => {
                      switch (role) {
                        case 2001:
                          return 'User'
                          break;
                        case 1984:
                          return 'Editor'
                          break;
                        case 5150:
                          return 'Admin'
                          break;
                      }
                    }).join(', ')}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          ):(
            <Card.Text>
              No users to display
            </Card.Text>
          )}
      </Card.Body>
  )
}

export default Users
