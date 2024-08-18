import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODBURI) return console.log("MongoDB URI is not defined");
  if (isConnected) return console.log("=> Using existing database connection");

  try {
    await mongoose.connect(process.env.MONGODBURI, {
      bufferCommands: false,
      maxPoolSize: 20, // Adjust based on your server capacity
      connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    });
    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
