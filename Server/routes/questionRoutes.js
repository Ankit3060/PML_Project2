import express from "express";
import {getReactQuestions}  from "../controller/questionController.js";


const router = express.Router();

router.get("/questions/react", getReactQuestions);

export default router;