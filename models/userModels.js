import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is require']
    },
    email: {
        type: String,
        required: [true, 'email is require']
    },
    password: {
        type: String,
        required: [true, 'password is require']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    appointment: [{
        type: mongoose.Types.ObjectId,
        ref: "appointments"
    }]
}, {timestamps: true})

const userModel = mongoose.model('users', userSchema);

export default userModel;