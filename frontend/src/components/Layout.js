import { Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container'

const Layout = () => {
    return (
        <Container className='d-flex min-vh-100 w-50 align-items-center justify-content-center'>
          <div className="jumbotron flex-fill">
            <Outlet />
          </div>
        </Container>
    )
}

export default Layout
