import express from "express";
import { 
    register,
    login,
    logoutUser,
    logoutAdmin,
    getUserDetails,
    updateDetails,
    updatePassword,
    getAllUsers
 } from "../controller/userController.js";
import { isAdminAuthenticated, isUserAuthenticated, isAuthenticated} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.get("/logout", isUserAuthenticated, logoutUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/me", isAuthenticated, getUserDetails);
router.put("/update", isAuthenticated, updateDetails);
router.put("/update-password", isAuthenticated, updatePassword);
router.get("/admin/users", isAdminAuthenticated, getAllUsers);

export default router;