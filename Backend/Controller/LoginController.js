import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import fs from 'fs';


// Models import
import User from '../Model/LoginModel.js';


dotenv.config();


// ==========================================
// 2. AUTH & USER CONTROLLERS
// ==========================================

// --- SIGNUP ---
export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User signup successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// --- LOGIN (User & Admin) ---
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. ADMIN LOGIN CHECK (Via .env)
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { id: "admin", role: "admin" }, 
                process.env.secret_key, 
                { expiresIn: "7d" }
            );

            return res.json({ 
                message: "Admin login successful", 
                token, 
                user: { 
                    name: "Admin", 
                    email: email, 
                    role: "admin" 
                } 
            });
        }

        // 2. USER LOGIN CHECK (Via Database)
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

       const token = jwt.sign(
  { id: user._id, role: user.role }, // 🔥 Ensure 'role' is here
  process.env.secret_key, 
  { expiresIn: "7d" }
);

        res.json({ 
            message: "User login successful", 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: "user" 
            } 
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// --- GET ALL USERS (Admin Only) ---
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json({ users });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// --- UPDATE USER ---
export const updateusers = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, email, name } = req.body;
        
        let updateData = { name, email };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// --- DELETE USER ---
export const deleteuser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


// --- GET ALL WORKBOOKS ---
export const getWorkbooks = async (req, res) => {
    try {
        const data = await Workbook.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching workbooks" });
    }
};
