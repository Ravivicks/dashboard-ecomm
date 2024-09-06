import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODBURI) {
    throw new Error("MongoDB URI is not defined");
  }
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODBURI, {
      maxPoolSize: 20,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });

    isConnected = mongoose.connection.readyState === 1; // 1 means connected
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
