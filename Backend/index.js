import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './Router/LoginRouter.js';
import router2 from './Router/imageRouter.js';
import AudioRoute from './Router/AudioRoute.js';

const app = express();

// 1. FIXED CORS: Origins ko array [] mein dalna zaroori hai
const allowedOrigins = [
  "http://localhost:5173", 
  "https://deluxe-sunflower-8b33ad.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "token"],
  credentials: true // Agar cookies ya headers use kar rahe ho
}));

app.use(express.json());

// Routes
app.use("/api", router);
app.use("/api", router2);
app.use("/api/audio", AudioRoute);

// 2. FIXED DB Connection: Error handling improve ki
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((err) => console.error("❌ DB connection error:", err));

// 3. FIXED Listen: Port fallback aur confirmation message add kiya
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});