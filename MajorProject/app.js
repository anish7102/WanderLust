const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const { isLoggedIn, isOwner } = require("./middleware.js");


// MongoDB
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}


// App Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


// Session
const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 2 * 24 * 60 * 60 * 1000,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));

// Flash
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash + Current User
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Index + New + Show
app.use("/listings", listingRouter);

// Create Listing
app.post("/listings", isLoggedIn, async (req, res, next) => {
    try {
        const newListing = new Listing(req.body.listing);

        newListing.owner = req.user._id;

        await newListing.save();

        req.flash("success", "New Listing Created!");

        res.redirect("/listings");

    } catch (err) {
        next(err);
    }
});

// Edit Listing
app.get("/listings/:id/edit", isLoggedIn, isOwner, async (req, res, next) => {
    try {
        const { id } = req.params;

        const listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing you requested for does not exist!");
            return res.redirect("/listings");
        }

        res.render("listings/edit.ejs", { listing });

    } catch (err) {
        next(err);
    }
});

// Update Listing
app.put("/listings/:id", isLoggedIn, isOwner, async (req, res, next) => {
    try {
        const { id } = req.params;

        await Listing.findByIdAndUpdate(
            id,
            { ...req.body.listing }
        );

        req.flash("success", "Listing Updated!");

        res.redirect(`/listings/${id}`);

    } catch (err) {
        next(err);
    }
});

// Delete Listing
app.delete("/listings/:id", isLoggedIn, isOwner, async (req, res, next) => {
    try {
        const { id } = req.params;

        await Listing.findByIdAndDelete(id);

        req.flash("success", "Listing Deleted!");

        res.redirect("/listings");

    } catch (err) {
        next(err);
    }
});

// REVIEW ROUTES
app.use("/listings/:id/reviews", reviewRouter);

// USER / AUTH ROUTES
app.use("/", userRouter);

// 404 ERROR
app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    let {
        statusCode = 500,
        message = "Something went wrong!"
    } = err;

    res.status(statusCode).render("error.ejs", { message });
});

// SERVER
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});