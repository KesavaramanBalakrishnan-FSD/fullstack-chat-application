import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
  try {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
      console.log("Already connected to the database.");
      return;
    }

    if (connectionState === 2) {
      console.log("Connecting to the database...");
      return;
    }

    const connectDb = await mongoose.connect(mongoUri);
    console.log(
      `Connected to MongoDB: ${connectDb.connection.name} at ${connectDb.connection.host}`
    );
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

export default connectDB;
