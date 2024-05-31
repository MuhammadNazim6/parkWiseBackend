import express from 'express';
import { Req, Res, Next } from '../types/expressTypes';
import { upload } from '../middleware/multer';
import { providerAdapter } from './injections/providerInjection';

const router = express();
// Provider register
router.post('/signup', (req: Req, res: Res, next: Next) => {
  providerAdapter.createProvider(req, res, next)
})
// Provider logout
router.post('/logout', (req: Req, res: Res, next: Next) => {
  providerAdapter.logoutProvider(req, res, next)
})
// Provider OTP send to mail
router.post('/send-otp', (req: Req, res: Res, next: Next) => {
  providerAdapter.sendOtp(req, res, next)
})
// For checking user entered otp and stored otp
router.post('/check-otp', (req: Req, res: Res, next: Next) => {
  providerAdapter.checkOtp(req, res, next)
})
// For sending approval request to admin and add parking slot
router.post('/sendLotForApproval',
  upload.array('images'),
  (req: Req, res: Res, next: Next) => {
    providerAdapter.sendLotForApproval(req, res, next)
  })

router.get('/providerDetails/:lotId',
  (req: Req, res: Res, next: Next) => {
    providerAdapter.getProviderDetails(req, res, next)
  })

router.patch('/updateProfile/:lotId',
  (req: Req, res: Res, next: Next) => {
    providerAdapter.updateProvProfile(req, res, next)
  })



export default router; 