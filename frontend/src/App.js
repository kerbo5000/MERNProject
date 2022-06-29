import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Layout from './components/Layout'
import Editor from './components/Editor'
import Admin from './components/Admin'
import Missing from './components/Missing'
import Unauthorized from './components/Unauthorized'
import Lounge from './components/Lounge'
import LinkPage from './components/LinkPage'
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
        <Route path='linkpage' element={<LinkPage />}/>
        <Route path='unauthorized' element={<Unauthorized />}/>
        /*private*/
        <Route element={<RequiredAuth allowedRoles={[2001]}/>}>
          <Route path='/' element={<Home />}/>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[1984]}/>}>
          <Route path='editor' element={<Editor />}/>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[5150]}/>}>
          <Route path='admin' element={<Admin />}/>
        </Route>
        <Route element={<RequiredAuth allowedRoles={[5150,1984]}/>}>
          <Route path='lounge' element={<Lounge />}/>
        </Route>
        /*catch all*/
        <Route path='*' element={<Missing />}/>
      </Route>
    </Routes>
  );
}

export default App;
