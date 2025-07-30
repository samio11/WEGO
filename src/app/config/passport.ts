import passport from "passport";
import { Strategy as Strategy } from "passport-local";

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {}
  )
);
