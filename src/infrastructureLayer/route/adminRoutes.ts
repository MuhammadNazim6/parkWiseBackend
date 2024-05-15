import express from "express";
import { Req, Res, Next } from "../types/expressTypes";
import { adminAdapter } from "./injections/adminInjection";

const router = express();

router.post("/logout", (req: Req, res: Res, next: Next) => {
  adminAdapter.logoutAdmin(req, res, next);
});
router.get("/getProvidersRequests", (req: Req, res: Res, next: Next) => {
  adminAdapter.getProvidersRequests(req, res, next);
});
router.get("/getUsers", (req: Req, res: Res, next: Next) => {
  adminAdapter.getUsers(req, res, next);
});
router.get("/getApprovedProviders", (req: Req, res: Res, next: Next) => {
  adminAdapter.getApprovedProviders(req, res, next);
});
router.patch("/blockUnblockUser", (req: Req, res: Res, next: Next) => {
  adminAdapter.blockUnblockUser(req, res, next);
});
router.patch("/blockUnblockProvider", (req: Req, res: Res, next: Next) => {
  adminAdapter.blockUnblockProvider(req, res, next);
});
router.patch("/acceptReq", (req: Req, res: Res, next: Next) => {
  adminAdapter.acceptRequest(req, res, next);
});
router.patch("/rejectReq", (req: Req, res: Res, next: Next) => {
  adminAdapter.rejectRequest(req, res, next);
});


export default router;
