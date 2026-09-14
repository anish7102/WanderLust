const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            username,
            email
        });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
});


router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    (req, res) => {
        console.log("LOGIN SUCCESS");
        console.log("Logged in user:", req.user);
        console.log("Authenticated:", req.isAuthenticated());
        console.log("Redirect URL:", res.locals.redirectUrl);

        req.flash("success", "Welcome back to WanderLust!");

        res.redirect(res.locals.redirectUrl || "/listings");
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged Out!");
        res.redirect("/listings");
    });
});

module.exports = router;