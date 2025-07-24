import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/question.json");

const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));


export const getReactQuestions = (req, res)=>{
    try {
        const reactQuestions = data["react-questions"];
        res.status(200).json({
            status: 200,
            message: "Questions fetched successfully",
            success: true,
            data: reactQuestions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export const getJSQuestions = (req, res)=>{
    try {
        const jsQuestions = data["javascript-questions"];
        res.status(200).json({
            status: 200,
            message: "Questions fetched successfully",
            success: true,
            data: jsQuestions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}



export const getHTMLQuestions = (req, res)=>{
    try {
        const htmlQuestions = data["html-questions"];
        res.status(200).json({
            status: 200,
            message: "Questions fetched successfully",
            success: true,
            data: htmlQuestions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


export const getCSSQuestions = (req, res)=>{
    try {
        const cssQuestions = data["css-questions"];
        res.status(200).json({
            status: 200,
            message: "Questions fetched successfully",
            success: true,
            data: cssQuestions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
