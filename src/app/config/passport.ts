import passport, { Profile } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../modules/user/user.model";
import { ERole } from "../modules/user/user.interfaces";
import { Driver } from "../modules/driver/driver.model";
import bcrypt from "bcrypt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from ".";
import { Rider } from "../modules/rider/rider.model";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
          return done(null, false, { message: "User is not Exits" });
        }
        if (foundUser?.isBlocked === true) {
          return done(null, false, { message: "User is Blocked" });
        }
        if (foundUser.role === (ERole.DRIVER as string)) {
          const foundDriver = await Driver.findOne({ userId: foundUser._id });
          if (!foundDriver) {
            return done(null, false, { message: "Driver is Not Exists" });
          }
          if (foundDriver.isApproved === false) {
            return done(null, false, {
              message: "Please wait for Admin Approve",
            });
          }
        }
        const passwordMatch = await bcrypt.compare(
          password,
          foundUser.password as string
        );
        if (!passwordMatch) {
          return done(null, false, { message: "Password is Incorrect" });
        }
        return done(null, foundUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID as string,
      clientSecret: config.GOOGLE_CLIENT_SECRET as string,
      callbackURL: config.GOOGLE_CALLBACK_URL as string,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        const email = profile?.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "Please Set Email in Google" });
        }
        let user = await User.findOne({ email });
        // Google Login Only For-> Rider
        if (!user) {
          user = await User.create({
            name: profile?.displayName,
            email,
            password: Math.random().toString(36).substring(2),
            phone: "N/A",
            profileImage: profile.photos?.[0].value,
            role: ERole.RIDER,
          });
          await Rider.create({ userId: user._id });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});
