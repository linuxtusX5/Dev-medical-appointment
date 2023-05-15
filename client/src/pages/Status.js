import React, {useState, useEffect} from 'react'
import {IconButton} from '@mui/material';
import { Table} from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {CircularProgress,Box} from '@mui/material'

export const Status = () => {
    const [appointment, setAppointment] = useState([]);

    const getUserAppointment = async () => {
        try {
            const id = localStorage.getItem('userID');
            const { data } = await axios.get(`/api/v1/user/user-appointment/${id}`);
            if(data?.success){
                setAppointment(data?.userAppointment.appointment)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserAppointment();
    },[]);

    const handleDelete = async(appointmentId) => {
        try {
            const data = await axios.delete(`/api/v1/user/user-DLTappointment/${appointmentId}`)
            if(data){
            toast.success('Deleted Successfully!', {
                position: toast.POSITION.BOTTOM_LEFT,
                className: 'foo-bar'
            })
            }
        } catch (error) {
            console.log(error)
        }
        console.log(appointmentId)
    }
    return (
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
                    <th>Datele</th>
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
                            <td><div 
                            style={{background: 'yellow', fontWeight: 'bold', 
                            height: '20px', display: 'flex', justifyContent: 'content', 
                            alignItems: 'center', borderRadius: '10px', padding: '10px'}}>{appoint.status}</div></td>
                            <td><IconButton onClick={() => handleDelete(appoint._id)}><DeleteIcon/></IconButton></td>
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
    )
}
