import { useState } from 'react';
import { message, Form } from 'antd';
import {TextField } from '@mui/material';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useDispatch } from 'react-redux';
import '../styles/Register.css';
import {Button} from 'react-bootstrap';

function Register() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register', values);
      if(res.data.success){
        message.success('Register Successfully');
        navigate('/login');
        window.location.reload();
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something Wrong!')
    }
  }
  return (
    <>
    <div className='back'> 
      <div id='form1' className="p-3 box col-md-4 card">
    <Form
        name="register"
        onFinish={onfinishHandler}
        initialValues={{
          remember: true,
        }}
      >
      <h2 className='mt-3 T1'>HealthCare Appointment</h2>
      <h5 className='mt-3 T'>Register to start your session</h5>
          <Form.Item
            name='name'
            rules={[{
              required: true,
              message: 'Please input your name!',
            }]}>
          <TextField 
            type="text" 
            required 
            label='Name'
            style={{width: '100%'}}
            value={Name}
            onChange={(e) => {setName(e.target.value)}}
            className='mb-1'/>
            </Form.Item>
          <Form.Item
            name='email'
            rules={[{
              required: true,
              message: 'Please input your Email!',
            }]}>
          <TextField 
            type="email" 
            required 
            label='Email'
            style={{width: '100%'}}
            value={Email}
            onChange={(e) => {setEmail(e.target.value)}}
            className='mb-1'/>
            </Form.Item>
            <Form.Item
            name='password'
            rules={[{
              required: true,
              message: 'Please input your Password!',
            }]}>
            <TextField 
            type="password" 
            required 
            label='Password'
            style={{width: '100%'}}
            value={Password}
            onChange={(e) => {setPassword(e.target.value)}}
            className='mb-1'/>
            </Form.Item>
            <Button variant="outline-primary" style={{width: '90%', margin: '20px'}} type="submit">
              Register
            </Button>
          <hr />
          <div className="col-11 m-3">
            <div className=" box mt-1 text-center">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </div>
      </Form>
      </div>
    </div>
    </>
  )
}

export default Register