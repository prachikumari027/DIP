import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cognitiveStage: {
        type: String,
        enum: ["mild", "moderate", "severe"],
        default: "mild",
    },
    familyMembers: [
        {
            name: String,
            relation: String,
            photoUrl: String,
        },
    ],
    preferences: [String],
    storedFacts: [
        {
            fact: String,
            savedAt: { 
                type: Date, 
                default: Date.now 
            },
        },
    ],
    dailyRoutine: [
        {
            time: String,
            activity: String,
            completed: { 
                type: Boolean, 
                default: false 
            },
        },
    ],
    caregiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Caregiver",
    },

},{ timestamps: true });

export default mongoose.model("Patient", patientSchema);