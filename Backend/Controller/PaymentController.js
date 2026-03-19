
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import { sendAudioEmail } from "./AudioMailController.js"; 
import Audio from "../Model/AudioModel.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Order Create karne ka function (Dono ke liye same rahega)
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; 
    const options = {
      amount: Number(amount * 100), 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Payment Verify karne ka merged function
export const verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      email,        // Audio ke liye zaroori, Workbook ke liye optional
      audioId,      // Audio ki ID
      itemId,       // Workbook ki ID (agar bhej rahe ho toh)
      itemType      // "audio" ya "workbook"
    } = req.body;

    // 1. Signature Verification (Ye step dono ke liye compulsory hai)
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, message: "Invalid Payment Signature!" });
    }

    // 2. Business Logic based on Item Type
    
    // --- CASE 1: WORKBOOK (No Email, Just Unlock) ---
    if (itemType === "workbook") {
      console.log("Workbook Payment Verified. Unlocking on Frontend...");
      return res.json({ 
        success: true, 
        message: "Payment Success! Workbook unlocked." 
      });
    }

    // --- CASE 2: AUDIO (Email required) ---
    else {
      const targetAudioId = audioId || itemId; // Dono mein se jo mile use karein
      const audio = await Audio.findById(targetAudioId);
      
      if (!audio) {
        return res.status(404).json({ success: false, message: "Audio not found" });
      }

      console.log("Starting Email Process for Audio:", email);
      const emailSent = await sendAudioEmail(email, audio.audioUrl, audio.title);

      if (emailSent) {
        return res.json({ success: true, message: "Payment Success! Audio sent to email." });
      } else {
        return res.status(500).json({ 
          success: false, 
          message: "Payment verified but Email failed to send." 
        });
      }
    }

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
