import express from "express";
import { Req, Res, Next } from '../types/expressTypes';
import { commonAdapter } from './injections/commonInjection';

const router = express();

router.post('/login', (req: Req, res: Res, next: Next) => {
  commonAdapter.commonLogin(req, res, next)
})
router.post('/resend-otp', (req: Req, res: Res, next: Next) => {
  commonAdapter.resendOtp(req, res, next)
})
router.post('/refreshToken', (req: Req, res: Res, next: Next) => {
  commonAdapter.refreshToken(req, res, next)
})
router.get('/bookingDetails/:bookingId',
  (req: Req, res: Res, next: Next) => {
    commonAdapter.getBookingDetails(req, res, next)
  })
router.get('/getConnections/:id',
  (req: Req, res: Res, next: Next) => {
    commonAdapter.getConnections(req, res, next)
  })
  router.get('/getMessagess',
    (req: Req, res: Res, next: Next) => {
      commonAdapter.getMessages(req, res, next)
    })
  router.post('/saveMessage',
    (req: Req, res: Res, next: Next) => {
      commonAdapter.saveMessage(req, res, next)
    })
  router.get('/getSender/:id',
    (req: Req, res: Res, next: Next) => {
      commonAdapter.getSenderName(req, res, next)
    })

export default router;    