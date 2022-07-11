import {useLocation,Navigate,Outlet} from 'react-router-dom'
import useGlobalContext from '../hooks/useGlobalContext'
const RequiredAuth = ({allowedRoles}) => {
  const {authState} = useGlobalContext()
  const location = useLocation()
  return(
    authState?.roles.find(role => allowedRoles.includes(role)) ?
      <Outlet/>
      : authState?.user ?
        <Navigate to='/unauthorized' state={{from: location}} replace />
        : <Navigate to='/login' state={{from: location}} replace />
  )
}
export default RequiredAuth
