import { Request, Response, NextFunction } from "express";
import { IncomingMessage } from 'http';

declare module 'express-serve-static-core' {
  interface Request {
    files?: any[]; // Adjust the type as necessary for your use case
  }
}
// Exporting types like Req, Res, and Next
export type Req = Request;
export type Res = Response;
export type Next = NextFunction;



