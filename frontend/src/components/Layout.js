
import { Outlet } from "react-router-dom"
import Header from './Header'
const Layout = () => {

    return (
      <div className="container">
        <div className="jumbotron">
          <div className="card">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    )
}

export default Layout
