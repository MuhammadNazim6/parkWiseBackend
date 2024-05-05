import express from 'express';
import { Req, Res, Next } from '../types/expressTypes';
import { providerAdapter } from './injections/providerInjection';

const router = express();

// Provider register
router.post('/signup', (req: Req, res: Res, next: Next) => {
  providerAdapter.createProvider(req, res, next)
})

// Provider login
router.post('/login',(req:Req,res:Res,next:Next)=>{
  providerAdapter.loginProvider(req,res,next)
})

// Provider logout
router.post('/logout',(req:Req,res:Res,next:Next)=>{
  providerAdapter.logoutProvider(req,res,next)
})

// Provider OTP send to mail
router.post('/send-otp',(req:Req,res:Res,next:Next)=>{
  providerAdapter.sendOtp(req,res,next)
})

// For checking user entered otp and stored otp
router.post('/check-otp',(req:Req,res:Res,next:Next)=>{
  providerAdapter.checkOtp(req,res,next)
})

export default router; 