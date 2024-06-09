import express from 'express'
import { Req, Res, Next } from '../types/expressTypes';
import { userAdapter } from './injections/userInjection';
import { userAuth } from '../middleware/authMiddleware';
import { upload } from '../middleware/multer';

const router = express.Router();

router.post("/signup", (req: Req, res: Res, next: Next) =>
  userAdapter.createUser(req, res, next)
);
router.post('/logout',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.logoutuser(req, res, next)
  })
// User OTP send to mail
router.post('/send-otp', (req: Req, res: Res, next: Next) => {
  userAdapter.sendOtp(req, res, next)
})
// For checking user entered otp and stored otp
router.post('/check-otp', (req: Req, res: Res, next: Next) => {
  userAdapter.checkOtp(req, res, next)
})
// For login in or signup of user with google Auth
router.post('/signGoogle', (req: Req, res: Res, next: Next) => {
  userAdapter.signGoogle(req, res, next)
})
// For sending otp and resetting password
router.post('/forgotPassword', (req: Req, res: Res, next: Next) => {
  userAdapter.forgotPassword(req, res, next)
})
// For changing password 
router.post('/changePassword', (req: Req, res: Res, next: Next) => {
  userAdapter.changePassword(req, res, next)
})
// For fetching searched providers 
router.get('/parking-lots', (req: Req, res: Res, next: Next) => {
  userAdapter.fetchParkingLotsInHome(req, res, next)
})
router.get('/lot-details/:lotId', (req: Req, res: Res, next: Next) => {
  userAdapter.fetchLotDetails(req, res, next)
})
router.post('/getBookedSlots', (req: Req, res: Res, next: Next) => {
  userAdapter.getBookedSlots(req, res, next)
})
router.post('/bookSlot', (req: Req, res: Res, next: Next) => {
  userAdapter.bookSlot(req, res, next)
})
router.patch('/updateProfile', upload.array('profile'), (req: Req, res: Res, next: Next) => {
  userAdapter.updateUserProfile(req, res, next)
})
router.get('/profilePicUser/:id', (req: Req, res: Res, next: Next) => {
  userAdapter.getUserProfilePic(req, res, next)
})
router.post('/checkUserPassword', (req: Req, res: Res, next: Next) => {
  userAdapter.checkUserPassword(req, res, next)
})
router.get('/fetchUserBookings', (req: Req, res: Res, next: Next) => {
  userAdapter.fetchUserBookings(req, res, next)
})
router.patch('/cancelBooking/:bookingId', (req: Req, res: Res, next: Next) => {
  userAdapter.cancelBooking(req, res, next)
})
router.post('/confirmSlot', (req: Req, res: Res, next: Next) => {
  userAdapter.confirmSlot(req, res, next)
})
router.get('/getFilledSlots/:bookingId', (req: Req, res: Res, next: Next) => {
  userAdapter.getFilledSlots(req, res, next)
})
router.patch('/rescheduleSlots', (req: Req, res: Res, next: Next) => {
  userAdapter.rescheduleSlots(req, res, next)
})

  
export default router;              