import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { generateToken } from "../utils/jwtToken.js";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "../data/users.json");


const readUsers = () => {
    if (!fs.existsSync(usersFilePath)) return [];
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};

const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 8 && password.length <= 20;
};


export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, gender, password, confirmPassword, role } = req.body;
        if (!firstName || !lastName || !email || !phone || !password || !gender || !confirmPassword || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let users = readUsers();

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const existingPhoneNumber = users.find(user => user.phone === phone);
        if (existingPhoneNumber) {
            return res.status(400).json({ success: false, message: "Phone number already exists" });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ success: false, message: "Password must meet the criteria" });
        }

        if(password !== confirmPassword){
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: crypto.randomBytes(16).toString('hex'),
            firstName,
            lastName,
            email,
            phone,
            gender,
            password: hashedPassword,
            role,
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        writeUsers(users);

        generateToken(newUser, "User registered successfully", 201, res);

    } catch (err) {
        res.status(500).json({ 
            status: 500,
            success: false, 
            message: "Internal Server Error" 
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ success: false, message: "Email, password are required" });
        }

        let users = readUsers();
        const user = users.find(user => user.email === email);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!user || !isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        if(role !== user.role) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        generateToken(user, "User logged in successfully", 200, res);

    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};


export const logoutUser = async (req, res) => {
    try {
        res.status(200).cookie("userToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        }).json({ 
            status: 200,
            success: true, 
            message: "User logged out successfully" 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};


export const logoutAdmin = async (req, res)=>{
    try {
        res.status(200).cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        }).json({ 
            status: 200,
            success: true, 
            message: "Admin logged out successfully" 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
}


export const getUserDetails = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found in token" });
        }
        const users = readUsers();
        const user = users.find(u => u.id === req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password, ...userData } = user;

        res.status(200).json({ 
            status : 200,
            success: true,
            user: userData 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};


export const updateDetails = async (req, res) => {
    try {
        const { firstName, lastName, gender, address, dob, qualification } = req.body;

        let users = readUsers();
        const userIndex = users.findIndex(u => u.id === req.user.id);

        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const user = users[userIndex];
        
        const updatingUser = {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            address: address,
            dob: dob ? new Date(dob).toISOString() : user.dob,
            qualification: qualification
        };

        const updatedUser = { ...user, ...updatingUser };

        users[userIndex] = updatedUser;
        writeUsers(users);

        const { password, ...userData } = updatedUser;

        res.status(200).json({ 
            status : 200,
            success: true, 
            message: "User details updated successfully", 
            user: userData 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};


export const updatePassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;

        if (!newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Both passwords are required" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        if (!validatePassword(newPassword)) {
            return res.status(400).json({ success: false, message: "Password does not meet security criteria" });
        }

        let users = readUsers();
        const userIndex = users.findIndex(u => u.id === req.user.id);

        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        users[userIndex].password = hashedPassword;

        writeUsers(users);

        res.status(200).json({ 
            status : 200,
            success: true, 
            message: "Password updated successfully" 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};


export const getAllUsers = async (req, res) => {
    try {

        let user = readUsers();
        user = user.map(({ password, ...rest }) => rest);

        res.status(200).json({ 
            status : 200,
            success: true, 
            users: user 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
}