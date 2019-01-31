import jwt from "jsonwebtoken";

import { IUserData } from "@lineage/core";

export function verifyToken(token: string, secret: string): IUserData {
  return jwt.verify(token, secret) as IUserData;
}

export function generateToken(
  user: IUserData,
  secret: string,
  expiresIn: string,
) {
  return jwt.sign(user, secret, {
    expiresIn,
  });
}
