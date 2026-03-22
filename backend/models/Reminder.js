import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },

        time: {
            type: String,
            required: true
        }, // format: "HH:MM"

        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["medicine", "meal", "water", "appointment", "other"],
            default: "other",
        },
        
        isActive: {
            type: Boolean,
            default: true
        },
        lastTriggered: {
            type: Date
        },

    }, { timestamps: true });

export default mongoose.model("Reminder", reminderSchema);