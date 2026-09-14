const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const { isLoggedIn, isLoggedInToBook } = require("../middleware.js");

// INDEX ROUTE
router.get("/", async (req, res, next) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
    } catch (err) {
        next(err);
    }
});

// NEW ROUTE
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

// SEARCH ROUTE
router.get("/search", async (req, res, next) => {
    try {
        let { title } = req.query;

        let listing = await Listing.findOne({
            title: { $regex: `^${title}$`, $options: "i" }
        });

        if (!listing) {
            req.flash("error", "Destination not found");
            return res.redirect("/listings");
        }

        res.redirect(`/listings/${listing._id}`);

    } catch (err) {
        next(err);
    }
});

// BOOK ROUTE
router.post("/:id/book", isLoggedInToBook, (req, res) => {
    req.flash("success", "Your booking was successful!");
    res.redirect(`/listings/${req.params.id}`);
});

// SHOW ROUTE
router.get("/:id", async (req, res, next) => {
    try {
        // console.log("========== SHOW ROUTE HIT ==========");
        // console.log("ID:", req.params.id);

        const listing = await Listing.findById(req.params.id)
            .populate("owner")
            .populate({
                path: "reviews",
                populate: {
                    path: "author"
                }
            });

        //console.log("LISTING FOUND:", listing);

        if (!listing) {
            req.flash("error", "Listing does not exist!");
            return res.redirect("/listings");
        }

        res.render("listings/show.ejs", { listing });

    } catch (err) {
        console.log("SHOW ERROR:", err);
        next(err);
    }
});

module.exports = router;