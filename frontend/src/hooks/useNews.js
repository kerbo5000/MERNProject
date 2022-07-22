import {useState,useEffect} from 'react'
import useAxiosPrivate from './useAxiosPrivate'
import useGlobalContext from './useGlobalContext'
const useNews = (pageNum = 1) => {
  const {test} = useGlobalContext()
  const axiosPrivate = useAxiosPrivate()
  useEffect(()=>{
    test(axiosPrivate,pageNum)
  },[pageNum])
}
export default useNews
