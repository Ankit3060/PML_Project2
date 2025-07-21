import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/question.json");

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));


export const getAllQuestions = (req, res)=>{
    try {
        res.status(200).json({
            status: 200,
            message: "Questions fetched successfully",
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
