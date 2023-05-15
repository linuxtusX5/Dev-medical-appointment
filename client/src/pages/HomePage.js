import { Carousel } from "react-bootstrap";
import img3 from '../assets/bigstock-Home-health-care-worker-and-an-13926641.jpg';
import img from '../assets/health-care-doctor-monitor.jpg';
import img2 from '../assets/2020_MedicalLabSciences_001.jpg';


function HomePage() {
  return (
    <div className="mt-5">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />
        <Carousel.Caption>
          <h2><b>HealthCare Clinic</b></h2>
          <p>Primary and Specialty Consultation</p>
        
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt="Second slide"
          />
        <Carousel.Caption>
          <h2><b>Medical Appointment</b></h2>
          <p>HealthCare Clinic</p>
        
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Second slide"
          />
        <Carousel.Caption>
          <h2><b>HealthCare Clinic</b></h2>
          <p>Laboratory and Diagnostics</p>
        
        </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default HomePage;
