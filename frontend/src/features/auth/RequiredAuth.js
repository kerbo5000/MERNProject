import {useLocation,Navigate,Outlet} from 'react-router-dom'
// import useGlobalContext from '../hooks/useGlobalContext'
import {useSelector} from 'react-redux'
import {selectCurrentToken} from './authSlice'

const RequiredAuth = () => {
  // const {authState} = useGlobalContext()
  const token = useSelector(selectCurrentToken)
  const location = useLocation()
  return(
    token
      ? <Outlet/>
      : <Navigate to='/login' state={{from: location}} replace />
  )
}
export default RequiredAuth
