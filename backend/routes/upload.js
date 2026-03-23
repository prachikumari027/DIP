import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import Photo from "../models/Photo.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// multer — store in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("❌ Only image files are allowed"));
    }
  },
});

// ─── UPLOAD PHOTO ────────────────────────────────────────
// POST /api/upload/photo
router.post("/photo", verifyToken, upload.single("photo"), async (req, res) => {
  try {
    const { patientId, caption, personName } = req.body;

    if (!patientId || !caption || !personName) {
      return res.status(400).json({ message: "❌ All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "❌ No photo uploaded" });
    }

    // upload to cloudinary using stream
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `alzheimer/${patientId}`,
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    };

    const result = await uploadFromBuffer();

    // save to MongoDB
    const photo = await Photo.create({
      patientId,
      imageUrl: result.secure_url,
      caption,
      personName,
    });

    res.status(201).json({
      message: "✅ Photo uploaded successfully",
      photo,
    });
  } catch (error) {
    console.error("Upload photo error:", error.message);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// ─── DELETE PHOTO ────────────────────────────────────────
// DELETE /api/upload/photo/:id
router.delete("/photo/:id", verifyToken, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: "❌ Photo not found" });
    }

    // extract public id from cloudinary URL
    const urlParts = photo.imageUrl.split("/");
    const publicId = `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1].split(".")[0]}`;

    // delete from cloudinary
    await cloudinary.uploader.destroy(publicId);

    // delete from MongoDB
    await Photo.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "✅ Photo deleted successfully" });
  } catch (error) {
    console.error("Delete photo error:", error.message);
    res.status(500).json({ message: "❌ Server error" });
  }
});

export default router;