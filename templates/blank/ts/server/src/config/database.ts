import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
    // MongoDB Connection
    mongoose.connect(process.env.MONGO_URI as string)
        .then(() => {
            console.log("✅ MongoDB connected");
        })
        .catch((err) => {
            console.error("❌ MongoDB connection failed:", err);
        });

}

export default connectDB;