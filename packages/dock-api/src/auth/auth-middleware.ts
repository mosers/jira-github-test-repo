import passport from "passport";

export const authMiddleware = passport.authenticate("jwt", { session: false });
export const loginMiddleware = passport.authenticate("local", {
  session: false,
});
