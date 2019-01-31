// @flow

import express, { RequestHandler } from "express";

import { IAuthClient } from "../auth";
import { authMiddleware, loginMiddleware } from "../auth/auth-middleware";

const createAsyncHandler = (fn: RequestHandler): RequestHandler => (
  req,
  res,
  next,
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export function createAuthRouter(db: any, auth: IAuthClient) {
  const router = express.Router();

  const login = createAsyncHandler(async (req, res) => {
    const {
      user: { id, badgeId },
    } = req;
    const user = { id, badgeId };

    res.status(200).json({
      token: await auth.getToken(user),
      user,
    });
  });

  const verify = createAsyncHandler(async (req, res) => {
    const {
      user: { id, badgeId },
    } = req;
    const user = { id, badgeId };

    res.status(200).json({
      token: await auth.getToken(user),
      user,
    });
  });

  router.route("/login").post(loginMiddleware, login);
  router.route("/verify").post(authMiddleware, verify);

  return router;
}
