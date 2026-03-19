
import mongoose from "mongoose";

const audioSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String, // 'Bundle' or 'Single'
  image: String,    // Thumbnail URL
  audioUrl: String, // Audio File URL (ImageKit supports mp3)
  fileId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Audio", audioSchema);