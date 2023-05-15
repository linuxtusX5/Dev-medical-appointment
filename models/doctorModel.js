import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId: {type: String},
    firstName: {type: String, required: [true, 'first name is required!']},
    lastName: {type: String, required: [true, 'last name is required!']},
    phone: {type: String, required: [true, 'phone No is reqired!']},
    email: {type: String, required: [true, 'email is required']},
    website: {type: String},
    address: {type: String, required: [true, 'address is required!']},
    experience: {type: String, required: [true, 'experience is required!']},
    feesPerCunsoltation: {type: Number, required: [true, 'fee is required!']},
    status: {type: String, default: 'pending'},
    timings: {type: Object, required: [true, 'work timing is required!']},
}, {timestamps: true});

const doctorModel = mongoose.model('doctors', doctorSchema);
export default doctorModel;