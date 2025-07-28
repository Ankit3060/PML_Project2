import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "../data/examData.json");

const readExam = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

const writeExam = (exam) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(exam, null, 2));
};


export const saveMarks = (req, res) => {
  try {
    const { userId, marks, totalQuestions, examType, questions } = req.body;

    if (!userId || marks == null || !totalQuestions || !examType || !questions) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const allExamResults = readExam();

    const newResult = {
      id: crypto.randomUUID(),
      userId,
      examType,
      marks,
      totalQuestions,
      percentage: ((marks / (totalQuestions * 4)) * 100).toFixed(2),
      timestamp: new Date().toISOString(),
      questions: questions.map((q) => ({
        questionId: q.questionId,
        question: q.questionText,
        options: q.options,
        selectedAnswer: q.selectedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect: q.isCorrect,
      })),
    };

    allExamResults.push(newResult);
    writeExam(allExamResults);

    res.status(200).json({
      success: true,
      message: "Marks saved successfully",
      data: newResult,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const getUserMarks = (req, res) => {
  try {
    const { id, examType } = req.params;

    const allExamResults = readExam();
    const userResults = allExamResults.filter(
      (result) => result.userId === id && result.examType === examType
    );

    if (userResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found for this user and exam type",
      });
    }

    res.status(200).json({
      success: true,
      message: "User marks fetched successfully",
      data: userResults,
    });
  } catch (error) {
    console.error("getUserMarks error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const previewExamPaper = (req, res) => {
  try {
    const { examId } = req.params;

    const allExamResults = readExam();
    const examPaper = allExamResults.find((result) => result.id === examId);
    if (!examPaper) {
      return res
        .status(404)
        .json({ success: false, message: "Exam paper not found" });
    }
    res.status(200).json({
      success: true,
      message: "Exam paper fetched successfully",
      data: examPaper,
    });
  } catch (error) {
    console.error("previewExamPaper error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
