import { Outlet,Link } from "react-router-dom"
import {useState,useEffect} from 'react'

const Editor = () => {
    const [tab,setTab] = useState('news')
    return (
      <div className="card-body">
        <h5 className="card-title">Editor</h5>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to='/editor/news' style={{textDecoration:'none'}} className={`nav-link ${tab === 'news' ? 'active':''}`} onClick={()=>setTab('news')}>News</Link>
          </li>
          <li className="nav-item">
            <Link to='/editor/users' style={{textDecoration:'none'}} className={`nav-link ${tab === 'user' ? 'active':''}`} onClick={()=>setTab('user')}>Users</Link>
          </li>
          <li className="nav-item">
            <Link to='/editor/employees' style={{textDecoration:'none'}} className={`nav-link ${tab === 'employee' ? 'active':''}`} onClick={()=>setTab('employee')}>Employees</Link>
          </li>
        </ul>
        <Outlet/>
      </div>
    )
}

export default Editor
