const mongoose = require("mongoose");

// Cache the connection for serverless environments (Vercel)
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    if (mongoose.connection.readyState >= 1) {
        isConnected = true;
        console.log("MongoDB already connected");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
        });
        isConnected = true;
        console.log("MongoDB Connected:", conn.connection.host);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; // Don't use process.exit() in serverless
    }
};

module.exports = connectDB;