import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {scrollNews} from '../features/news/newsSlice'
import {useGetNewsQuery,} from '../features/news/newsApiSlice'
import {useSelector} from 'react-redux'
import {selectCurrentUserId} from '../features/auth/authSlice'
const SearchBar = ({setNumPage}) => {
  const [search,setSearch] = useState('')
  const handleSubmit = (e) => e.preventDefault()
  useEffect(() => {
    if(search){
      setNumPage
    }    
  },[search])
  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label class="form-label">Search</label>
        <input type="text" class="form-control" aria-describedby="emailHelp" onChange={(e)=>setSearch(e.target.value)} value={search}/>
      </div>
    </form>
    )
}

export default SearchBar