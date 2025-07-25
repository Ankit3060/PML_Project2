import express from 'express';
import { saveMarks, getUserMarks,previewExamPaper } from '../controller/examDataController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/save-marks', isAuthenticated, saveMarks);
router.get('/get-marks/:examType/:id', isAuthenticated, getUserMarks);
router.get('/preview-paper/:examId', isAuthenticated, previewExamPaper);

export default router;
