import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages, uploadFile } from "../controllers/MessagesController.js";
import { OtherFilesstorage, fileFilter } from "../storage/storage.js";
import multer from "multer";

const messagesRoutes = Router();

const upload = multer({ storage: OtherFilesstorage, fileFilter: fileFilter });

messagesRoutes.post("/get-messages", verifyToken, getMessages);
messagesRoutes.post(
  "/upload-file",
  verifyToken,
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err.message);
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  uploadFile
);

export default messagesRoutes;
