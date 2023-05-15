import React, {useState, useEffect} from 'react'
import { Table, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import {CircularProgress,Box} from '@mui/material'
import AdminHome from './AdminHome';

export default function ClientAppointment() {
    const [appointment, setAppointment] = useState([]);

    const AllAppointment = async () => {
        try {
            const { data } = await axios.get('/api/v1/user/all-appointment');
            if(data?.success){
                setAppointment(data?.appointments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        AllAppointment();
    },[]);

    return (
    <>
    <AdminHome/>
    <div className='container mt-5' style={{height: '400px', overflowY: 'scroll'}}>
    <ToastContainer/>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>category</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {appointment && appointment.length > 0 ? (
                    appointment.map((appoint) => (
                        <tr key={appoint._id}>
                            <td>{appoint._id}</td>
                            <td>{appoint.userName}</td>
                            <td>{appoint.useremail}</td>
                            <td>{appoint.category}</td>
                            <td>{appoint.date}</td>
                            <td>
                            <DropdownButton variant='info' title={appoint.status}>
                                <Dropdown.Item >Reject</Dropdown.Item>
                                <Dropdown.Item >Approve</Dropdown.Item>
                            </DropdownButton>
                            </td>
                        </tr>
                    ))
                ) :  (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                <CircularProgress />
            </Box>
            )}
            </tbody>
        </Table>
    </div>
    </>
    )
}
