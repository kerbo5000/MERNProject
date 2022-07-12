import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import NewsFeed from './components/NewsFeed'
import Favorites from './components/Favorites'
import Layout from './components/Layout'
import Editor from './components/Editor'
import Admin from './components/Admin'
import Missing from './components/Missing'
import UsersTable from './components/UsersTable'
import NewsTable from './components/NewsTable'
import EmployeesTable from './components/EmployeesTable'
import Unauthorized from './components/Unauthorized'
import { Routes, Route } from 'react-router-dom'
import RequiredAuth from './components/RequiredAuth'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        /*public*/
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />}/>
        <Route path='unauthorized' element={<Unauthorized />}/>
        /*private*/
        <Route element={<RequiredAuth allowedRoles={[2001]}/>}>
          <Route path='/' element={<Home />}>
            <Route path='newsfeed' element={<NewsFeed />}/>
            <Route path='favorites' element={<Favorites />}/>
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[1984]}/>}>
          <Route path='editor' element={<Editor />}>
            <Route path='news' element={<NewsTable />}/>
            <Route path='users' element={<UsersTable />}/>
            <Route path='employees' element={<EmployeesTable />}/>
          </Route>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[5150]}/>}>
          <Route path='admin' element={<Admin />}/>
        </Route>
        /*catch all*/
        <Route path='*' element={<Missing />}/>
      </Route>
    </Routes>
  );
}

export default App;
