import express from 'express';
import { Req, Res, Next } from '../types/expressTypes';
import { adminAdapter } from './injections/adminInjection';


const router = express();

// Admin login
router.post('/login',(req:Req, res:Res, next:Next)=>{
  adminAdapter.loginAdmin(req, res, next);
})

export default router;  