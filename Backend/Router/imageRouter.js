import express from "express";
import multer from "multer";
import imagekitMiddleware from "../Middleware/ImagekitMiddleware.js";
import {
  Uploadfile,
  getWorkbooks,
  deleteWorkbook
} from "../Controller/ImagekitController.js";

import { 
  createOrder, 
  verifyPayment 
} from "../Controller/PaymentController.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024 // 6 MB max per file
  }
});

// --- Workbook Management Routes ---

router.post(
  "/upload-workbook",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 }
  ]),
  imagekitMiddleware("admin"),
  Uploadfile
);

router.get("/all", getWorkbooks);

router.delete(
  "/delete-workbook/:id",
  imagekitMiddleware("admin"),
  deleteWorkbook
);

// --- Payment Routes ---
router.post("/payment/create-order", createOrder);
router.post("/payment/verify-payment", verifyPayment);

export default router;