// utils/connectDB.ts
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const MONGODB_URL: string | undefined = process.env.MONGODB_URL;

  if (!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variable");
  }

  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Consider handling this error more gracefully
  }
};
