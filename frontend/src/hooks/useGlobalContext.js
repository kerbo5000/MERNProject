import {useContext} from 'react'
import AppContext from '../context/appProvider'
const useGlobalContext = () =>{
  return useContext(AppContext)
}

export default useGlobalContext
