import React from 'react'
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function Footer() {
  return (
    <div style={{
        background: '#2C3333',
        color: '#fff',
        paddingTop: '50px',
        fontSize: '15px',
        padding: '50px'
    }}>
      <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h3>About Us</h3>
          <p>We are a company that specializes in providing high-quality services to our customers.</p>
        </div>
        <div className="col-md-4">
          <h3>Our Services</h3>
          <ul>
            <li>Primary and Specialty Consultation</li>
            <li>Laboratory and Diagnostics</li>
            <li>Rehabilitation Medicine Services</li>
          </ul>
        </div>
        <div className="col-md-4">
          <h3>Contact Us</h3>
          <p>
          <CallIcon/> Phone: 0916-502-7442<br/> 
          <MailOutlineIcon/> Email: savatusjoffrey@gmail.com</p>
        </div>
      </div>
    </div>
</div>
  )
}

export default Footer