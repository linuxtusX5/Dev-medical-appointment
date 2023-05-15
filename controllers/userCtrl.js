import userModel from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from "moment";
import appointmentModel from "../models/appointmentModel.js";
import mongoose from "mongoose";

const toId = mongoose.Types.ObjectId;

export const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({email: req.body.email});
        if(existingUser){
            return res.status(200).send({
                message: 'user already exist', 
                success: false,
            });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        
        res.status(201).send({
            message: 'Register successfully',
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Register controller ${error.message}`,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email, isAdmin: false});
        if(user.isAdmin){
            return res.status(200).send({
                message: 'user not found',
                success: false
            })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({
                message: 'Invalid email or Password',
                success: false
            })
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.status(200).send({
            message: 'Login Successfully',
            success: true,
            token,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Login controller ${error.message}`,
        });
    }
};

//admin 
export const adminController = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email, isAdmin: true });
        if(!user.isAdmin){
            return res.status(200).send({
                message: 'user not found',
                success: false
            })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({
                message: 'Invalid email or Password',
                success: false
            })
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.status(200).send({
            message: 'admin Login Successfully',
            success: true,
            token,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Login controller ${error.message}`,
        });
    }
};

//Auth
export const authController = async (req, res) => {
    try {
        const user = await userModel.findById({_id: req.body.userId});
        user.password = undefined;
        if(!user){
            return res.status(200).send({
                message: 'user not found',
                success: user
            });
        }else{
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email
                },
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'auth error',
            success: false,
            error,
        });
    }
};

//Booking Apppointments
export const AppointmentController = async (req, res) => {
    try {
        const { userName, useremail, category, date, status, user } = req.body;
        if(!userName || !useremail || !category || !date || !user){
            return res.status(400).send({
                success: false,
                message: "Please Provide all Field"
            })
        }

        const existingUser = await userModel.findById(user);
        if(!existingUser){
            return res.status(404).send({
                success: false,
                message: "unable to find user"
            })
        }
        // const User = await userModel.findOne(req.body.appointment);
        // await newAppointment.save();
        // User.appointment.push(newAppointment);
        // await User.save();

        req.body.date = moment(req.body.date).toISOString();
        req.body.status = "pending";
        req.body.user = user;
        const newAppointment = new appointmentModel(req.body);
        const session = await mongoose.startSession();
        session.startTransaction();
        await newAppointment.save({session});
        existingUser.appointment.push(newAppointment)
        await existingUser.save({session})
        await session.commitTransaction()

        await newAppointment.save();
        res.status(200).send({
            success: true,
            message: "Appointment Book Successfully!",
            newAppointment
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Booking Appointments!"
        })
    }
}

//Deleting UserAppointmentController
export const DeleteAppointmentController = async(req, res) => {
    try {
        const appointment = await appointmentModel.findByIdAndDelete(req.params.id).populate('user');
        if(appointment && appointment.user && appointment.user.appointment){
            await userModel.findByIdAndUpdate(appointment.user._id, {
                $pull: { appointment: appointment._id }
            });
            return res.status(200).send({
                success: true,
                message: 'Appointment deleted successfully',
                appointment
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Appointment not found'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error while deleting appointment",
            success: false,
            error,
        });
    }
};



//all appointment user
export const AllUserAppointment = async(req, res) => {
    try {
        const userAppointment = await userModel.findById(req.params.id).populate('appointment');
        if(!userAppointment){
            return res.status(404).send({
                success: false,
                message: 'Appointment not found with this ID'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'user Appointment',
            userAppointment
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Error in user Appointment",
            success: false,
            error
        })
    }
}


//all appointment
export const AllAppointment = async(req, res) => {
    try {
        const appointments = await appointmentModel.find(); // get all appointments
        return res.status(200).send({
            success: true,
            message: 'All appointments',
            appointments
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Error in getting all appointments",
            success: false,
            error
        })
    }
}
