import { Strategy } from "passport";
import { IUser, IUserData } from "@lineage/core";
import { createAuthUtil } from "./auth-util";
import { createAuthStrategy } from "./auth-strategy";
import { generateToken, verifyToken } from "./auth-util-jwt";
import { DOCK_API_JWT_SECRET, DOCK_API_JWT_EXPIRE } from "../config/env";

export interface IAuthClient {
  authenticate: (username: string, password: string) => Promise<string>;
  verify: (token: string) => Promise<IUserData>;
  getToken: (userData: IUserData) => Promise<string>;
  strategy: {
    local: Strategy;
    jwt: Strategy;
  };
}

export function createAuthClient(db: any): IAuthClient {
  const util = createAuthUtil(db);

  async function authenticate(username: string, password: string) {
    const user = await util.authenticate(username, password);

    return getToken(user);
  }

  async function verify(token: string): Promise<IUser> {
    const userData = verifyToken(token, DOCK_API_JWT_SECRET);
    const userId = userData.id;

    if (!userId) {
      throw new Error(`Could not verify token ${token}`);
    }

    const model = await db.User.findById(userId);

    if (!model) {
      throw new Error(`Error while authenticating user with id ${userId}`);
    }

    return model.toJSON();
  }

  async function getToken(user: IUserData) {
    return generateToken(user, DOCK_API_JWT_SECRET, DOCK_API_JWT_EXPIRE);
  }

  return {
    authenticate,
    verify,
    getToken,
    strategy: createAuthStrategy(util),
  };
}
