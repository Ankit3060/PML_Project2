import express from "express";
import {getAllQuestions}  from "../controller/questionController.js";


const router = express.Router();

router.get("/questions", getAllQuestions);

export default router;