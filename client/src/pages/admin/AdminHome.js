import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import maintenace from '../../assets/6873-under-maintenance.gif';
function AdminHome() {
  return (
    <Container fluid>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><b> Admin Dashboard</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/client-appointment">Appointments</Nav.Link>
            <Nav.Link href="/user">Users</Nav.Link>
            <NavDropdown title="Settings">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/security">Security</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default AdminHome;

export const User = () => {
  return(
    <>
    <AdminHome/>
      <div className='container mt-5' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="row">
            <div className="col-md-9 mt-3">
            <h3 style={{fontWeight: 'bold', color: 'red'}}>User is under maintenance</h3>
              <Image src={maintenace} 
            className="d-block w-100"/>
            </div>
        </div>
      </div>
    </>
  )
}
export const Profile = () => {
  return(
    <>
    <AdminHome/>
      <div className='container mt-5' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="row">
            <div className="col-md-9 mt-3">
            <h3 style={{fontWeight: 'bold', color: 'red'}}>Profile is under maintenance</h3>
              <Image src={maintenace} 
            className="d-block w-100"/>
            </div>
        </div>
      </div>
    </>
  )
}
export const Security = () => {
  return(
    <>
    <AdminHome/>
      <div className='container mt-5' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="row">
            <div className="col-md-9 mt-3">
            <h3 style={{fontWeight: 'bold', color: 'red'}}>Security is under maintenance</h3>
              <Image src={maintenace} 
            className="d-block w-100"/>
            </div>
        </div>
      </div>
    </>
  )
}