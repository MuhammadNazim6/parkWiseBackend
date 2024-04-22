import express from 'express';
import { Req, Res, Next } from '../types/expressTypes';
import { providerAdapter } from './injections/providerInjection';

const router = express();

// Provider register
router.post('/register', (req: Req, res: Res, next: Next) => {
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

export default router; 