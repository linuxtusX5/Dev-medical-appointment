import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import {Nav, Card, Modal, Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HomePage from '../pages/HomePage';
import d1 from '../assets/undraw_doctor_kw5l.png';
import d2 from '../assets/undraw_Scientist_ft0o.png';
import d3 from '../assets/undraw_medicine_b1ol.png';
import d4 from '../assets/undraw_medical_care_movn.png';
import Appointments from '../pages/Appointments';
import Footer from '../pages/footer/Footer';
import "aos/dist/aos.css";
import AOS from "aos";
import {message} from 'antd';
import { useNavigate } from 'react-router-dom';
import { Status } from '../pages/Status';

function NavBar() {
    AOS.init({
    duration: 1000,});
    AOS.refreshHard();

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleLogout = () => {
        localStorage.clear();
        message.success('Logout Successfully');
        navigate('/login')
    }
    return (
    <div style={{position: 'relative', fontFamily: 'sans-serif'}}>
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand>HealthCare</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/"><HomeIcon/> Home</Nav.Link>
            <Nav.Link href="#Services"><SupportAgentIcon/> Services</Nav.Link>
            <NavDropdown title="Appointment" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#Appointment">Set-appointment</NavDropdown.Item>
                <NavDropdown.Item onClick={handleShow2} href="#status">
                Status
                </NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav onClick={handleShow}>
            <Nav.Link eventKey={2} href="#Profile">
                <AccountCircleIcon/>{" "}
                Profile
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>

    {/* Modals */}
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button variant='danger' onClick={handleLogout}>
                Logout
            </Button>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
        </Modal.Footer>
    </Modal>

    {/* modals for status */}
    <Modal show={show2} onHide={handleClose2} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Status/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
            Close
            </Button>
        </Modal.Footer>
    </Modal>

        {/* Carousel */}
    <HomePage/>
    
    <div id="Services" className="container mt-5" data-aos="fade-up" >
        <h2 style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4C0001', fontWeight: 'bold'}} >
        Our Services</h2>
        <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        HealthCare Clinic is a multi-specialty, full service clinic that serves a wide range of medical services.
Click on each icon to learn more about these services</p>
        <div className="row">
            <div className="col-md-4 mt-3">
            <Card>
                <Card.Body>
                <Card.Title>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} >
                <img src={d1} 
                    alt="Second slide" 
                    style={{
                        width: '50%'
                    }}     
                    />
                    </div>
                    </Card.Title>
                <Card.Text style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Primary and Specialty Consultation
                </Card.Text>
                </Card.Body>
            </Card>
            </div>
            <div className="col-md-4 mt-3">
            <Card>
                <Card.Body>
                <Card.Title>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} >
                <img src={d2} 
                    alt="Second slide" 
                    style={{
                        width: '50%'
                    }}     
                    />
                    </div>
                    </Card.Title>
                <Card.Text style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Laboratory and Diagnostics
                </Card.Text>
                </Card.Body>
            </Card>
            </div>
            <div className="col-md-4 mt-3">
            <Card>
                <Card.Body>
                <Card.Title>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} >
                <img src={d3} 
                    alt="Second slide" 
                    style={{
                        width: '50%'
                    }}     
                    />
                    </div>
                    </Card.Title>
                <Card.Text style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Rehabilitation Medicine Services
                </Card.Text>
                </Card.Body>
            </Card>
            </div>
            <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}><div style={{
            height: '0.8px',
            width: '100px',
            background: '#4C0001'
            }}></div></div>
            
        <h2 className='mt-3' style={{display: 'flex', alignItems: 'center', 
        justifyContent: 'center', padding: '10px', color: '#4C0001', fontWeight: 'bold' }}>In HealthCare Clinic you are safe!</h2>
        <p className='mt-3' style={{display: 'flex', alignItems: 'center', 
        justifyContent: 'center', padding: '10px',
        fontFamily: 'sans-serif' }}>This Safety Seal Certification affirms that the clinic branches are 100% compliant to the minimum public health standards set by the 
        government and that each integrates their contact tracing process to the StaySafe.ph app.</p>

        </div>
        </div>
        <div  id="Appointment">
            <Appointments/>
        </div>
        <div style={{display: 'flex', alignItems: 'center', 
        justifyContent: 'center', padding: '20px' }}  data-aos="fade-up" >
        <Card className='p-4'>
                <h3 style={{display: 'flex', alignItems: 'center', 
        justifyContent: 'center', color: '#4C0001', 
        fontWeight: 'bold' }}>HealthCare</h3>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}><div style={{
            height: '0.8px',
            width: '100px',
            background: '#4C0001'
            }}></div></div>
            <Card.Title className='mt-3'>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} >
                <img src={d4} 
                    alt="Second slide" 
                    style={{
                        width: '50%'
                    }}     
                    />
                    </div>
            </Card.Title>
            <Card.Text>
        <p style={{
            fontFamily: 'sans-serif'
        }}>
            HealthCare Clinic is a network of multi-specialty medical clinics offering comprehensive outpatient healthcare products and services. Believing that healthcare should be not just of quality, but must also be accessible, we integrated in our clinics the entire spectrum of medical services 
            that patients need to take better care of their health
        </p>
            </Card.Text>
        </Card>
        </div>
        <Footer/>
    </div>
    );
}

export default NavBar;