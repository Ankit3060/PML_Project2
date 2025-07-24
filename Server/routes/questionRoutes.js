import express from "express";
import {
    getReactQuestions,
    getJSQuestions,
    getHTMLQuestions,
    getCSSQuestions
}  from "../controller/questionController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/questions/react", isAuthenticated, getReactQuestions);
router.get("/questions/javascript", isAuthenticated, getJSQuestions);
router.get("/questions/html", isAuthenticated, getHTMLQuestions);
router.get("/questions/css", isAuthenticated, getCSSQuestions);

export default router;