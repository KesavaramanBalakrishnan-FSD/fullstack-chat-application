import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";
import channelRoutes from "./routes/ChannelRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const mongoUri = process.env.DATABASE_URL;

const corsOptions = {
  origin: ["https://fullstack-chat-application-1.onrender.com"], // Add frontend URL here
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  //   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

setupSocket(server);

if (!mongoUri) {
  console.warn(
    "Warning: DATABASE_URL is missing. Server will run, but no DB connection."
  );
} else {
  connectDB(mongoUri);
}
