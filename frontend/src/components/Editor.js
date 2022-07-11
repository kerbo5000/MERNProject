import { Outlet,Link } from "react-router-dom"
import {useState,useEffect} from 'react'

const Editor = () => {
    const [tab,setTab] = useState('news')
    return (
      <div className="card-body">
        <h5 className="card-title">Editor</h5>
        <ul className="nav nav-tabs">
          <Link to='/editor/news' style={{textDecoration:'none'}}>
            <li className="nav-item">
              <a className={`nav-link ${tab === 'news' ? 'active':''}`} onClick={()=>setTab('news')}>News</a>
            </li>
          </Link>
          <Link to='/editor/users' style={{textDecoration:'none'}}>
            <li className="nav-item">
              <a className={`nav-link ${tab === 'user' ? 'active':''}`} onClick={()=>setTab('user')}>Users</a>
            </li>
          </Link>
          <Link to='/editor/employees' style={{textDecoration:'none'}}>
            <li className="nav-item">
              <a className={`nav-link ${tab === 'employee' ? 'active':''}`} onClick={()=>setTab('employee')}>Employees</a>
            </li>
          </Link>
        </ul>
        <Outlet/>
      </div>
    )
}

export default Editor
