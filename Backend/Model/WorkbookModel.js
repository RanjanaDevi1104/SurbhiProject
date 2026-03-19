
import mongoose from "mongoose";

const workbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,   // Thumbnail image link
  fileId: String,  // ImageKit file ID (image delete karne ke liye)
  pdfUrl: String,  // 🔥 Naya field: PDF file ka link (Google Drive ya ImageKit link)
  pdfFileId: String,
  paymentLink: String, // Optional: Agar koi external link rakhna ho
});

export default mongoose.model("Workbook", workbookSchema);