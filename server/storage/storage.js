import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Allowed MIME types
const allowedTypes = [
  "application/zip",
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
];

// File filter function for Multer
const fileFilter = (req, file, cb) => {
  console.log("Uploaded file mimetype:", file.mimetype); // Debugging

  const allowedTypes = [
    "application/zip",
    "application/x-zip-compressed",
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type: ${file.mimetype}. Only ZIP, PDF, and images are allowed!`
      ),
      false
    );
  }
};

// ✅ Profile Image Storage (Only Images)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ChatApplication-Profile-Image",
    format: async (req, file) => "png",
  },
});

// ✅ Other File Storage (Images, PDFs, ZIPs)
const OtherFilesstorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = file.originalname.split(".").pop().toLowerCase();
    const filename = file.originalname.replace(/\s+/g, "-"); // Replace spaces with dashes

    return {
      folder: "uploads/files",
      resource_type: "raw",
      public_id: filename, // Keep the filename with extension, but replace spaces
    };
  },
});

export { storage, OtherFilesstorage, fileFilter };
