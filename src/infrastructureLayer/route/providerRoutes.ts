import express from 'express';
import { Req, Res, Next } from '../types/expressTypes';
import { upload } from '../middleware/multer';
import { providerAdapter } from './injections/providerInjection';
import { providerAuth } from '../middleware/authMiddleware';

const router = express();
// Provider register
router.post('/signup', (req: Req, res: Res, next: Next) => {
  providerAdapter.createProvider(req, res, next)
})
// Provider logout
router.post('/logout',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.logoutProvider(req, res, next)
  })
// Provider OTP send to mail
router.post('/send-otp',
  (req: Req, res: Res, next: Next) => {
    providerAdapter.sendOtp(req, res, next)
  })
// For checking user entered otp and stored otp
router.post('/check-otp',
  (req: Req, res: Res, next: Next) => {
    providerAdapter.checkOtp(req, res, next)
  })
// For sending approval request to admin and add parking slot
router.post('/sendLotForApproval',
  providerAuth,
  upload.array('images'),
  (req: Req, res: Res, next: Next) => {
    providerAdapter.sendLotForApproval(req, res, next)
  })

router.get('/providerDetails/:lotId',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.getProviderDetails(req, res, next)
  })

router.patch('/updateProfile/:lotId',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.updateProvProfile(req, res, next)
  })

router.get('/lotsBookings/:lotId',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.fetchLotsBookings(req, res, next)
  })

router.post('/checkProvPassword',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.checkProvPassword(req, res, next)
  })

router.patch('/updateParkingLot',
  providerAuth,
  upload.array('images'),
  (req: Req, res: Res, next: Next) => {
    providerAdapter.updateParkingLotDetails(req, res, next)
  })

router.get('/fetchServicesCount/:provId',
  // providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.fetchServicesCount(req, res, next)
  })

router.get('/provProfile/:provId',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.getProvProfile(req, res, next)
  })



export default router; 