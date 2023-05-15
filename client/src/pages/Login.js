/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Form, message } from 'antd';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useDispatch } from 'react-redux';
import '../styles/Register.css';
import {Button} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

function login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Name, setName] = useState('');
  const [Pass, setPass] = useState('');

  const onfinishHandler = async (value) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', value);
      // window.location.reload();
      dispatch(hideLoading());
      if(res.data.success){
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userID', res.data?.user._id);
        toast.success('Login Successfully', {
              position: toast.POSITION.BOTTOM_LEFT,
              className: 'foo-bar'
            })
        navigate('/');
      }
      else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something Wrong!')
    }
  };

  // const adminHandler = async() => {
  //     try {
  //     dispatch(showLoading());
  //     const res = await axios.post('http://localhost:1337/api/v1/user/admin', {email: Name, password: Pass});
  //     // window.location.reload();
  //     dispatch(hideLoading());
  //     if(res.data.success){
  //       localStorage.setItem('token', res.data.token);
  //       localStorage.setItem('userID', res.data?.user._id);
  //       toast.success('Login as admin Successfully', {
  //             position: toast.POSITION.BOTTOM_LEFT,
  //             className: 'foo-bar'
  //           })
  //       navigate('/admin-dashboard');
  //     }
  //     else{
  //       message.error(res.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log(error);
  //     message.error('Something Wrong!')
  //   }
  // }
  return (
    <div className='back'>
    <ToastContainer/>
      <div id='form1' className="p-3 box col-md-4 card">
    <Form
        name="login"
        onFinish={onfinishHandler}
        initialValues={{
          remember: true,
        }}>
      <h2 className='mt-3 T1'>HealthCare Appointment</h2>
      <h5 className='mt-3 T'>Login to start your session</h5>
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
            value={Name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='off'
            className='mb-1'/>
          </Form.Item>
            <Form.Item
            name='password'
            rules={[{
              required: true,
              message: 'Please input your Password!',
            }]}>
          <TextField
            required
            type='password'
            value={Pass}
            onChange={(e) => setPass(e.target.value)}
            style={{ width: '100%' }}
            label='Password'
            autoComplete='off'
            className='mb-1'/>
            </Form.Item>
            <div className='d-flex' style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="outline-primary" style={{width: '90%', margin: '20px'}} type="submit">
              login
            </Button>
            {/* <p>or</p> */}
            </div>
          <hr />
          <div className="col-11 m-3">
            <div className=" box mt-1 text-center">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </div>
      </Form>
            {/* <Button onClick={adminHandler} variant="outline-primary" style={{width: '90%', margin: '20px'}} >
              login as admin
            </Button> */}
      </div>
    </div>
  )
}

export default login