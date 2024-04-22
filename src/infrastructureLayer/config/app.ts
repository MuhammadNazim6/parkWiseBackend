import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import morgan from "morgan";


// Provide route imports here
import userRouter from '../route/userRoute';
import adminRouter from '../route/adminRoutes';


export const app = express()

app.use(cookieParser())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb', extended:true, parameterLimit:5000}))
app.use(morgan('dev'))

// Provide route usage here
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
