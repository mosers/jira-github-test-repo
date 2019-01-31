import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { IUserData } from "@lineage/core";
import { IAuthUtil } from "./auth-util";
import { DOCK_API_JWT_SECRET } from "../config/env";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: DOCK_API_JWT_SECRET,
};

export function createAuthStrategy(util: IAuthUtil) {
  const local = new LocalStrategy(
    { usernameField: "badgeId", passwordField: "pin" },
    async (
      badgeId: string,
      pin: string,
      done: (err: Error | null, user?: IUserData) => any,
    ) => {
      let user;

      try {
        user = await util.authenticate(badgeId, pin);
      } catch (err) {
        return done(err);
      }

      return done(null, user);
    },
  );

  const jwt = new JwtStrategy(jwtOptions, async (payload, done) => {
    let user;

    try {
      user = await util.getUserById(payload.id);
    } catch (err) {
      return done(err);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });

  return {
    local,
    jwt,
  };
}
