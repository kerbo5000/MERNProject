import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Layout from './pages/Layout'
// import Editor from './pages/Editor'
// import Admin from './pages/Admin'
import Missing from './pages/Missing'
// import UsersTable from './components/UsersTable'
// import NewsTable from './components/NewsTable'
// import EmployeesTable from './components/EmployeesTable'
// import SingleNews from './pages/SingleNews'
// import EmployeePage from './pages/EmployeePage'
import Favorites from './components/Favorites'
import NewsFeed from './components/NewsFeed'
import Unauthorized from './pages/Unauthorized'
import { Routes, Route } from 'react-router-dom'
import RequiredAuth from './features/auth/RequiredAuth'

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
        {/* <Route element={<RequiredAuth allowedRoles={[2001,1984,5150]}/>}>
          <Route path='news'>
            <Route path=':newsId' element={<SingleNews />}/>
            <Route path=':employeeId' element={<EmployeePage />}/>
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
        </Route> */}
        /*catch all*/
        <Route path='*' element={<Missing />}/>
      </Route>
    </Routes>
  );
}

export default App;
