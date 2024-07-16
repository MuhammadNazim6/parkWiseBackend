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
router.post('/send-otp', (req: Req, res: Res, next: Next) => {
  userAdapter.sendOtp(req, res, next)
})
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
router.post('/changePassword', (req: Req, res: Res, next: Next) => {
  userAdapter.changePassword(req, res, next)
})
router.get('/parking-lots', (req: Req, res: Res, next: Next) => {
  userAdapter.fetchParkingLotsInHome(req, res, next)
})

router.get('/lot-details/:lotId', (req: Req, res: Res, next: Next) => {
  userAdapter.fetchLotDetails(req, res, next)
})

router.post('/getBookedSlots', (req: Req, res: Res, next: Next) => {
  userAdapter.getBookedSlots(req, res, next)
})

router.post('/bookSlot',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.bookSlot(req, res, next)
  })

router.patch('/updateProfile',
  userAuth,
  upload.array('profile'),
  (req: Req, res: Res, next: Next) => {
    userAdapter.updateUserProfile(req, res, next)
  })

router.get('/profilePicUser/:id',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.getUserProfilePic(req, res, next)
  })

router.post('/checkUserPassword',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.checkUserPassword(req, res, next)
  })

router.get('/fetchUserBookings',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.fetchUserBookings(req, res, next)
  })

router.patch('/cancelBooking/:bookingId',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.cancelBooking(req, res, next)
  })

router.post('/confirmSlot',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.confirmSlot(req, res, next)
  })

router.get('/getFilledSlots/:bookingId',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.getFilledSlots(req, res, next)
  })

router.patch('/rescheduleSlots',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.rescheduleSlots(req, res, next)
  })

router.get('/userDetails/:userId',
  // needed by both user and provider
  (req: Req, res: Res, next: Next) => {
    userAdapter.getUserDetails(req, res, next)
  })
  
router.get('/bookingCount/:userId',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.getUserBookingCount(req, res, next)
  })
  
router.get('/chatCount/:userId',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.getUserChatCount(req, res, next)
  })

router.post('/addFeedback',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.addFeedback(req, res, next)
  })

router.delete('/deleteFeedback',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.deleteFeedback(req, res, next)
  })

router.patch('/editFeedback',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.editFeedback(req, res, next)
  })

router.get('/getLotFeedbacks/:lotId',
  userAuth,
  (req: Req, res: Res, next: Next) => {
    userAdapter.getLotFeedbacks(req, res, next)
  })

router.post('/suggestions',
  (req: Req, res: Res, next: Next) => {
    userAdapter.addSuggestion(req, res, next)
  })
 
  

export default router;              