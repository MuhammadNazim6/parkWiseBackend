import express from 'express';
import { Req, Res, Next } from '../types/expressTypes';
import { upload } from '../middleware/multer';
import { providerAdapter } from './injections/providerInjection';
import { providerAuth } from '../middleware/authMiddleware';

const router = express();
router.post('/signup', (req: Req, res: Res, next: Next) => {
  providerAdapter.createProvider(req, res, next)
})
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

router.get('/lotsBookings',
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
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.fetchServicesCount(req, res, next)
  })

router.get('/fetchTodaysBookingCountProv/:provId',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.fetchTodaysBookingCountProv(req, res, next)
  })

router.get('/fetchMonthly/:provId',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.fetchMonthlyProv(req, res, next)
  })

router.get('/fetchWeekly/:provId',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.fetchWeeklyProv(req, res, next)
  })

router.get('/fetchDaily/:provId',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.fetchDailyProv(req, res, next)
  })
  
router.get('/provProfile/:provId',
  providerAuth,
  (req: Req, res: Res, next: Next) => {
    providerAdapter.getProvProfile(req, res, next)
  })



export default router; 