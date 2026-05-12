import express from "express";
import passport from "passport";
import { googleAuthFailure, googleAuthSuccess } from "../controllers/authController.js";


const router = express.Router();

router.route('/auth/google')
    .get(passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account"
    }))

router.route('/auth/google/callback')
    .get(
        passport.authenticate("google", {
            failureRedirect: "/auth/failure",
            session: false
        }),
        googleAuthSuccess
    );

router.route('/auth/failure')
    .get(googleAuthFailure);

export default router;