import express from "express";
import { Req, Res, Next } from "../types/expressTypes";
import { adminAdapter } from "./injections/adminInjection";
import { adminAuth } from "../middleware/authMiddleware";

const router = express();

router.post("/logout",
  adminAuth,
  (req: Req, res: Res, next: Next) => {
    adminAdapter.logoutAdmin(req, res, next);
  });
router.get("/getProvidersRequests",
  adminAuth,
  (req: Req, res: Res, next: Next) => {
    adminAdapter.getProvidersRequests(req, res, next);
  });
router.get("/getUsers",
  adminAuth,
  (req: Req, res: Res, next: Next) => {
    adminAdapter.getUsers(req, res, next);
  });
router.get("/getApprovedProviders",
  adminAuth,
  (req: Req, res: Res, next: Next) => {
    adminAdapter.getApprovedProviders(req, res, next);
  });
router.patch("/blockUnblockUser",
  adminAuth,
  (req: Req, res: Res, next: Next) => {
    adminAdapter.blockUnblockUser(req, res, next);
  });
router.patch("/blockUnblockProvider",
  adminAuth,
  (req: Req, res: Res, next: Next) => {
    adminAdapter.blockUnblockProvider(req, res, next);
  });
router.patch("/acceptReq",
  adminAuth,
  (req: Req, res: Res, next: Next) => {
    adminAdapter.acceptRequest(req, res, next);
  });
router.patch("/rejectReq",
  adminAuth,
  (req: Req, res: Res, next: Next) => {
    adminAdapter.rejectRequest(req, res, next);
  });


export default router;
