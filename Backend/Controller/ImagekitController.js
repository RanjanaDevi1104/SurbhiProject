
import dotenv from "dotenv";
import ImageKit from "imagekit";
import Workbook from "../Model/WorkbookModel.js";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

// ==========================================
// 1. UPLOAD WORKBOOK (Thumbnail + PDF)
// ==========================================
export const Uploadfile = async (req, res) => {
  try {
    console.log("========== UPLOAD START ==========");
    console.log("REQ HEADERS:", req.headers);
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);

    const { title, description, price } = req.body;
    const files = req.files;

    if (!files || !files.image || !files.pdf) {
      console.log("❌ Files missing");
      return res.status(400).json({
        message: "Both Image (Thumbnail) and PDF are required"
      });
    }

    console.log("✅ Files received");
    console.log("Image Name:", files.image[0].originalname);
    console.log("Image Size:", files.image[0].size);
    console.log("PDF Name:", files.pdf[0].originalname);
    console.log("PDF Size:", files.pdf[0].size);

    console.log("🚀 Uploading image to ImageKit...");
    const imageRes = await imagekit.upload({
      file: files.image[0].buffer.toString("base64"),
      fileName: files.image[0].originalname,
      folder: "/workbooks/thumbnails",
    });
    console.log("✅ Image uploaded:", imageRes.url);

    console.log("🚀 Uploading PDF to ImageKit...");
    const pdfRes = await imagekit.upload({
      file: files.pdf[0].buffer.toString("base64"),
      fileName: files.pdf[0].originalname,
      folder: "/workbooks/pdfs",
    });
    console.log("✅ PDF uploaded:", pdfRes.url);

    console.log("💾 Saving workbook in MongoDB...");
    const saved = await Workbook.create({
      title,
      description,
      price: parseFloat(price) || 0,
      image: imageRes.url,
      fileId: imageRes.fileId,
      pdfUrl: pdfRes.url,
      pdfFileId: pdfRes.fileId,
      paymentLink: process.env.PAYMENT_LINK,
    });

    console.log("✅ Workbook saved in DB");
    console.log("========== UPLOAD SUCCESS ==========");

    res.status(201).json(saved);

  } catch (err) {
    console.error("❌ UPLOAD ERROR FULL:", err);
    console.log("========== UPLOAD FAILED ==========");
    res.status(500).json({ error: "Upload failed: " + err.message });
  }
};

// ==========================================
// 2. GET ALL WORKBOOKS
// ==========================================
export const getWorkbooks = async (req, res) => {
  try {
    const data = await Workbook.find().sort({ _id: -1 }); 
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching workbooks" });
  }
};

// ==========================================
// 3. DELETE WORKBOOK (Image + PDF + DB Record)
// ==========================================
export const deleteWorkbook = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Database se workbook find karein
    const workbook = await Workbook.findById(id);
    if (!workbook) {
      return res.status(404).json({ message: "Workbook not found" });
    }

    // 2. ImageKit se Files delete karein (Thumbnail aur PDF dono)
    try {
      if (workbook.fileId) await imagekit.deleteFile(workbook.fileId); // Image delete
      if (workbook.pdfFileId) await imagekit.deleteFile(workbook.pdfFileId); // PDF delete
    } catch (ikErr) {
      console.log("ImageKit files already deleted or not found");
    }

    // 3. Database se record delete karein
    await Workbook.findByIdAndDelete(id);

    res.status(200).json({ message: "Workbook and its files deleted successfully" });
  } catch (err) {
    console.error("Workbook Delete Error:", err);
    res.status(500).json({ error: err.message });
  }
};