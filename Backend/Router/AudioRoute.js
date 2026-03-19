import express from "express";
import multer from "multer";
import imagekitMiddleware from "../Middleware/ImagekitMiddleware.js";
import { 
  uploadAudio, 
  getAllAudios,
  deleteAudio 
} from "../Controller/AudioMailController.js"; 
import { 
  createOrder, 
  verifyPayment 
} from "../Controller/PaymentController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Routes
router.post(
  "/upload-audio", 
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), 
  imagekitMiddleware("admin"), 
  uploadAudio
);


router.delete("/delete-audio/:id", deleteAudio);
router.get("/all-audios", getAllAudios);
router.post("/payment/create-order", createOrder);
router.post("/payment/verify", verifyPayment);

export default router;