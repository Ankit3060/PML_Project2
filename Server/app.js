import express,{urlencoded} from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import question from "./routes/questionRoutes.js";
import userRouter from "./routes/userRoutes.js"
import examDataRouter from "./routes/examDataRoutes.js"

export const app = express();

config({path: "config.env"});

app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET", "POST", "DELETE", "PUT"],
    credentials : true
}));

app.use(cookieParser());
app.use(urlencoded({extended: true}));
app.use(express.json());


app.use("/api/v1/exam",question);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/exam/data",examDataRouter)