import passport from "../passport/passport.js";

export const authenticate = passport.authenticate("jwt", {
  session: false,
});