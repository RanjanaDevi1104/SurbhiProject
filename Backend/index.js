import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './Router/LoginRouter.js'
import router2 from './Router/imageRouter.js'
// import PaymentRoute from './Router/PaymentRoute.js'
import AudioRoute from './Router/AudioRoute.js'

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors({
  origin: "*", // Ya apna frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "token"] 
}));
app.use("/api",router)
app.use("/api",router2)
app.use("/api/audio",AudioRoute)

 mongoose
 .connect(process.env.MONGO_URL)
.then(()=>console.log("db connected"))
.catch((err)=>console.log(err))

app.listen(process.env.PORT)