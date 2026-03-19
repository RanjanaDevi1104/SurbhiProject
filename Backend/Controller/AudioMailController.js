import Audio from "../Model/AudioModel.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import nodemailer from "nodemailer"; // ईमेल के लिए ज़रूरी

dotenv.config(); 

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

// ==========================================
// 1. ईमेल भेजने वाला फंक्शन (जो आप भूल गए थे)
// ==========================================
// Ensure this is exported
export const sendAudioEmail = async (userEmail, audioLink, audioTitle) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,         
        pass: process.env.EMAIL_PASS 
      }
    });

    const mailOptions = {
      from: `"Cosmic Sacred" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `✨ Your Sacred Healing Audio: ${audioTitle}`,
      html: `
        <div style="background-color: #05020a; color: #ffffff; padding: 40px; font-family: sans-serif; text-align: center;">
          <h1 style="color: #a855f7;">Cosmic Sacred</h1>
          <p>The cosmic frequencies for <b>"${audioTitle}"</b> are now unlocked for you.</p>
          <div style="margin: 30px 0;">
            <a href="${audioLink}" style="background: #8b5cf6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
               LISTEN TO TRANSMISSION
            </a>
          </div>
          <p style="color: #666; font-size: 12px;">The link is safe and hosted on ImageKit Cloud.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email Error:", error);
    return false;
  }
};

// ==========================================
// 2. Upload Audio (Admin only)
// ==========================================
export const uploadAudio = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const files = req.files;

    if (!files || !files.image || !files.audio) {
      return res.status(400).json({ message: "Image and Audio both required" });
    }

    const imageRes = await imagekit.upload({
      file: files.image[0].buffer.toString("base64"),
      fileName: files.image[0].originalname,
      folder: "/light-language/thumbnails",
    });

    const audioRes = await imagekit.upload({
      file: files.audio[0].buffer.toString("base64"),
      fileName: files.audio[0].originalname,
      folder: "/light-language/audios",
    });

    const newAudio = await Audio.create({
      title,
      description,
      price: parseFloat(price),
      category,
      image: imageRes.url,
      audioUrl: audioRes.url,
      fileId: audioRes.fileId
    });

    res.status(201).json(newAudio);
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ==========================================
// 3. Get All Audios (Public)
// ==========================================
export const getAllAudios = async (req, res) => {
  try {
    const audios = await Audio.find().sort({ _id: -1 });
    res.json(audios);
  } catch (err) {
    res.status(500).json({ message: "Error fetching audios" });
  }
};



// ==========================================
// 4. Delete Audio (Admin only)
// ==========================================
export const deleteAudio = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Database se audio find karein
    const audio = await Audio.findById(id);
    if (!audio) {
      return res.status(404).json({ message: "Audio file not found in database" });
    }

    // 2. ImageKit se Audio File delete karein (agar fileId save hai toh)
    if (audio.fileId) {
      try {
        await imagekit.deleteFile(audio.fileId);
      } catch (ikError) {
        console.error("ImageKit Delete Error:", ikError.message);
        // Agar ImageKit se delete na bhi ho, hum DB se delete continue rakhenge
      }
    }

    // 3. Database se record delete karein
    await Audio.findByIdAndDelete(id);

    res.status(200).json({ message: "Audio transmission deleted successfully" });
  } catch (err) {
    console.error("Delete Controller Error:", err);
    res.status(500).json({ error: err.message });
  }
};