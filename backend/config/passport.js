import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

console.log("google client id in passport.js:", process.env.GOOGLE_CLIENT_ID)
console.log("google secret:", process.env.GOOGLE_CLIENT_SECRET)
console.log("google url:", process.env.GOOGLE_CALLBACK_URL)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google profile:", profile);
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser); // LOGIN
        }

        const newUser = await User.create({
          googleId: profile.id,
          email: profile?.emails[0]?.value,
          name: profile.displayName,
        });

        return done(null, newUser); // SIGNUP
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;