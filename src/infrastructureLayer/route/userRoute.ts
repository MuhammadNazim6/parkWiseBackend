import express from 'express'
import { Req, Res, Next } from '../types/expressTypes';
import { userAdapter } from './injections/userInjection';

const router = express.Router();

// User register route
router.post("/signup", (req: Req, res: Res, next: Next) =>
  userAdapter.createUser(req, res, next)
);

router.post('/login', (req: Req, res: Res, next: Next) =>
  userAdapter.loginUser(req, res, next)
)
export default router;  