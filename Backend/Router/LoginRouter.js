// import express from 'express';
// import { login, Signup, getAllUsers, updateusers, deleteuser ,addWorkbook, getWorkbooks } from '../Controller/LoginController.js';
// import LoginMiddleware from '../Middleware/LoginMiddleware.js'; // Path check kar lena

// const router = express.Router();

// // --- PUBLIC ROUTES ---
// router.post("/signup", Signup);
// router.post("/login", login);

// // --- PRIVATE ROUTES (Admin Only) ---
// // Note: Frontend se 'token' header mein bhejiyega: headers: { token: "YOUR_JWT" }
// router.get("/users", LoginMiddleware("admin"), getAllUsers);
// router.delete("/delete/:id", LoginMiddleware("admin"), deleteuser);

// // --- PRIVATE ROUTES (Self or Admin) ---
// router.put("/update/:id", LoginMiddleware(), updateusers); 


// router.post("/add-workbook", LoginMiddleware("admin"), addWorkbook);
// router.get("/get-workbooks", getWorkbooks); // Ye public ho sakta hai

// export default router;





import express from 'express';
import { 
    login, 
    Signup, 
    getAllUsers, 
    deleteuser, 
    getWorkbooks,
    
} from '../Controller/LoginController.js';
import LoginMiddleware from '../Middleware/LoginMiddleware.js';

const router = express.Router();

// --- PUBLIC ROUTES ---
router.post("/signup", Signup);
router.post("/login", login);
router.get("/get-workbooks", getWorkbooks); // Sab dekh sakte hain

// --- PRIVATE ROUTES (Admin Only) ---
router.get("/users", LoginMiddleware("admin"), getAllUsers);
router.delete("/delete/:id", LoginMiddleware("admin"), deleteuser);




export default router;