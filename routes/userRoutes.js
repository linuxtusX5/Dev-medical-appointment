import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {registerController, 
    loginController, authController, AppointmentController,
    DeleteAppointmentController,
    AllUserAppointment,
    AllAppointment,
    adminController
} from '../controllers/userCtrl.js';

const router = express.Router();

//Routes
router.post('/register', registerController);
router.post('/login', loginController);

router.post('/admin',authMiddleware, adminController);
//Auth || POST
router.post('/getUserData', authController)

//Book Appointments
router.post('/book-appointment', AppointmentController)

//all apointment of user
router.get('/user-appointment/:id', AllUserAppointment)

//all apointment of user
router.get('/all-appointment', AllAppointment)

//Delete
router.delete('/user-DLTappointment/:id', DeleteAppointmentController);


export default router;