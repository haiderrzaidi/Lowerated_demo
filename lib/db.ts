import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = "mongodb+srv://wisalkhanmv:LOWERATED@lowerratedcluster.nyln2.mongodb.net/";
console.log("MONGODB_URL:", MONGODB_URL);

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connect = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variable");
  }

  try {
    cached.promise = cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: "lowerated",
        bufferCommands: false,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        serverSelectionTimeoutMS: 60000,
        family: 4, // Use IPv4, skip trying IPv6
      });

    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");

    // Add connection error handler
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }

  return cached.conn;
};