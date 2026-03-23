import mongoose from "mongoose";

const distressEventSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    triggerType: {
        type: String,
        enum: [
            "confusion_keyword",
            "short_response",
            "repeated_question",
            "help_button",
            "negative_emotion",
        ],
    },
    messageSnippet: {
        type: String
    },
    distressScore: {
        type: Number
    },
    acknowledged: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

export default mongoose.model("DistressEvent", distressEventSchema);