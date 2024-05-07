import express from 'express';
import { Req, Res, Next } from '../types/expressTypes';
import { adminAdapter } from './injections/adminInjection';


const router = express();

// Admin logout
router.post('/logout',(req:Req,res:Res,next:Next)=>{
  adminAdapter.logoutAdmin(req,res,next)
})

export default router;  