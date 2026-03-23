import mongoose from "mongoose";

const caregiverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    patientIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
        },
    ],

}, { timestamps: true });

export default mongoose.model("Caregiver", caregiverSchema);