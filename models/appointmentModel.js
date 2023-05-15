import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        useremail: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: "pending",
        }
    },{ timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);
export default appointmentModel;