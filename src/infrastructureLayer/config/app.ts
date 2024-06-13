import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import morgan from "morgan";
import { createServer } from 'node:http';
import { Server } from "socket.io";

import userRouter from '../route/userRoute';
import adminRouter from '../route/adminRoutes';
import providerRouter from '../route/providerRoutes';
import commonRouter from '../route/commonRoutes';
import errorHandler from "../../usecaseLayer/handler/errorHandler";
import SocketServer from "../services/socketServer";


export const app = express();
export const httpServer = createServer(app);

const socketServer = new SocketServer(httpServer, process.env.CORS_URL as string);

// const io = new Server(httpServer,{
//   cors:{
//     origin:process.env.CORS_URL,
//     methods: ['GET', 'POST'], 
//     credentials: true
//   }
// });


// io.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
  
//   socket.on('chatMessage', (data) => {
//     console.log(`Message from ${data.user}: ${data.message}`);
//     io.emit('chatMessage', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected');
//   });
// });

app.use(cookieParser())
app.use(cors(
  {
    origin: process.env.CORS_URL,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 5000 }))
app.use(morgan('dev'))



app.use("/api/user", userRouter);
app.use("/api/common", commonRouter);
app.use("/api/admin", adminRouter);
app.use("/api/provider", providerRouter);

app.use(errorHandler)
