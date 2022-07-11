
import { Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Header from './Header'
const Layout = () => {

    return (
        <Container className='d-flex min-vh-100 w-100 align-items-center justify-content-center'>
          <div className="jumbotron flex-fill">
            <Card>
              <Header />
              <Outlet />
            </Card>
          </div>
        </Container>
    )
}

export default Layout
