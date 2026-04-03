
// import express from "express";
// import multer from "multer";
// import imagekitMiddleware from "../Middleware/ImagekitMiddleware.js";
// import {
//   Uploadfile,
//   getWorkbooks,
//   deleteWorkbook
// } from "../Controller/ImagekitController.js";

// const router = express.Router();

// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/upload", 
//   upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), 
//   imagekitMiddleware("admin"), 
//   Uploadfile
// );

// router.get("/all", getWorkbooks);

// router.delete(
//   "/delete-workbook/:id", // Path unique kar diya
//   imagekitMiddleware("admin"),
//   deleteWorkbook
// );

// export default router;









import express from "express";
import multer from "multer";
import imagekitMiddleware from "../Middleware/ImagekitMiddleware.js";
import {
  Uploadfile,
  getWorkbooks,
  deleteWorkbook
} from "../Controller/ImagekitController.js";

// Payment Controller se functions import karein
import { 
  createOrder, 
  verifyPayment 
} from "../Controller/PaymentController.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// --- Workbook Management Routes ---

router.post("/upload", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), 
  imagekitMiddleware("admin"), 
  Uploadfile
);

router.get("/all", getWorkbooks);

router.delete(
  "/delete-workbook/:id", 
  imagekitMiddleware("admin"),
  deleteWorkbook
);

// --- Payment Routes (Workbook ke liye) ---

// Frontend call karega: /api/payment/create-order
router.post("/payment/create-order", createOrder);

// Frontend call karega: /api/payment/verify-payment
// (Dhyan dein: Maine path 'verify-payment' rakha hai jaisa aapke frontend mein tha)
router.post("/payment/verify-payment", verifyPayment);

export default router;