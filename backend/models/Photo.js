import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true
    },

},{ timestamps: true });

export default mongoose.model("Photo", photoSchema);