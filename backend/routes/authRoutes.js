import express from "express";
import passport from "passport";
import { googleAuthFailure, googleAuthSuccess } from "../controllers/authController.js";


const router = express.Router();

router.route('/auth/google')
    .get(passport.authenticate("google", { scope: ["profile", "email"] }))

// router.route('/auth/google/callback')
//     .get(
//         passport.authenticate("google", { failureRedirect: "/auth/failure" }),
//         googleAuthSuccess
//     );

router.route('/auth/google/callback')
    .get(
        (req, res, next) => {
            console.log("Callback route reached");
            next();
        },
        passport.authenticate("google", (err, user, info) => {
            if (err) {
                console.log("Passport error:", err);
                return res.status(500).send("Authentication error");
            }

            if (!user) {
                console.log("No user returned", info);
                return res.redirect("/auth/failure");
            }

            req.user = user;
            return googleAuthSuccess(req, res);
        })
    );


router.route('/auth/failure')
    .get(googleAuthFailure);

export default router;