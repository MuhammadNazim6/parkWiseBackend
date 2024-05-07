import express from "express";
import { Req, Res, Next } from '../types/expressTypes';
import { commonAdapter } from './injections/commonInjection';

const router = express();

// For changing password 
router.post('/resend-otp', (req: Req, res: Res, next: Next) => {
  commonAdapter.resendOtp(req, res, next)
})


export default router;    