import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import morgan from "morgan";
// Provide route imports here
import userRouter from '../route/userRoute';
import adminRouter from '../route/adminRoutes';
import providerRouter from '../route/providerRoutes';
import commonRouter from '../route/commonRoutes';
import errorHandler from "../../usecaseLayer/handler/errorHandler";

export const app = express()

// Middlewares
app.use(cookieParser())
app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }))
app.use(morgan('dev'))

// Provide route usage here
app.use("/api/user", userRouter);
app.use("/api/common", commonRouter);
app.use("/api/admin", adminRouter);
app.use("/api/provider", providerRouter);

app.use(errorHandler)
