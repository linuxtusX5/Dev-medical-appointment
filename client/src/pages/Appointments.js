import React, {useState} from 'react';
import { Button, Card } from 'react-bootstrap';
import "aos/dist/aos.css";
import AOS from "aos";
import { Form} from 'antd';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MenuItem } from '@mui/material';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const options = [
  'CareConsultation',
  'SpecialtyConsultation',
  'LabTests',
  'Covid',
  'CheckUp/Physical',
  'Xray',
  'Vaccination'
];

export default function Appointments() {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [input, setInput] = useState();
  const [disable, setDisable] = useState(0);
  const dispatch = useDispatch();

    const id = localStorage.getItem('userID')

    const handleBooking = async() => {
        try {
          dispatch(showLoading());
          const res = await axios.post('/api/v1/user/book-appointment', {
            user: id,
            userName: name,
            useremail: email,
            category:  input,
            date: date
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          dispatch(hideLoading());
          if(res.data.success){
            toast.success('Appointment Successfully!', {
              position: toast.POSITION.BOTTOM_LEFT,
              className: 'foo-bar'
            })
            setDisable(true);

          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
        }
        console.log(date)
  };


    AOS.init({
    duration: 1000,});
  return (
    <div className='row m-3' style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }} >
    <ToastContainer/>
      <div className="col-md-4 mt-3" data-aos="fade-up">
      <Card>
          <Card.Body>
          <Card.Text
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4C0001'
            }} >
                <b>Appointment</b>
          </Card.Text>
          <Card.Title>
                <p>Choose the Date</p>
          <div
              style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
              }} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
              />
            </LocalizationProvider>
              </div>
              </Card.Title>
          </Card.Body>
      </Card>
      </div>
    <div className='col-md-6 mt-3' data-aos="fade-up" >
    <Card>
      <Card.Title
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
            color: '#4C0001'
        }} >
        <b>Fill-up</b>
      </Card.Title>
      <Card.Body>
    <Form
        name="Appointment"
        onFinish={handleBooking}
        initialValues={{
          remember: true,
        }}>
          <Form.Item
            name='email'
            rules={[{
              required: true,
              message: 'Please input your Email!',
            }]}>
          <TextField
            required
            style={{ width: '100%' }}
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            className='mb-1'/>
          </Form.Item>
            <Form.Item
            name='name'
            rules={[{
              required: true,
              message: 'Please input your Password!',
            }]}>
          <TextField
            required
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%' }}
            label='Name'
            autoComplete='off'
            className='mb-1'/>
            </Form.Item>

            <Form.Item
            name='Choose'
            rules={[{
              required: true,
              message: 'Please Choose!',
            }]}
            className='row mb-1'>
            <TextField
            required
            select
            value={input}
            style={{width: '100%'}}
            label='Choose a category...'
            onChange={(e) => setInput(e.target.value)}
            className='mb-3'>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
            </TextField>
            </Form.Item>
            <Button disabled={disable} variant="outline-primary" style={{width: '90%', margin: '20px'}} type="submit">
              {disable ? "1 Appointment Only!" : "Submit"}
            </Button>
      </Form>
      </Card.Body>
    </Card>
    </div>
    </div>
  )
}
