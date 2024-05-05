import express from 'express'
import { Req, Res, Next } from '../types/expressTypes';
import { userAdapter } from './injections/userInjection';
// import { protectUser } from '../middleware/userAuth';

const router = express.Router();

// User register route
router.post("/signup", (req: Req, res: Res, next: Next) =>
  userAdapter.createUser(req, res, next)
);

// User login route
router.post('/login', (req: Req, res: Res, next: Next) =>
  userAdapter.loginUser(req, res, next)
)

// User logout route
router.post('/logout' ,(req: Req, res: Res, next: Next) => {
  userAdapter.logoutuser(req, res, next)
}
)

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

export default router;  