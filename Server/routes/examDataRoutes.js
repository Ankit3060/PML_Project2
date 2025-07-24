import express from 'express';
import { saveMarks, getUserMarks } from '../controller/examDataController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/save-marks', isAuthenticated, saveMarks);
router.get('/get-marks/:examType/:id', isAuthenticated, getUserMarks);

export default router;
