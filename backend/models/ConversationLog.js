import mongoose from "mongoose";

const conversationLogSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    messages: [
        {
            role: {
                type: String,
                enum: ["patient", "ai"]
            },
            content: String,
            timestamp: {
                type: Date,
                default: Date.now
            },
        },
    ],
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    distressScore: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export default mongoose.model("ConversationLog", conversationLogSchema);