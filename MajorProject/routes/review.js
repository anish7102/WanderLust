const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");


// Create Review
router.post("/", async (req, res) => {

    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created!");

    res.redirect(`/listings/${listing._id}`);
});


// Delete Review
router.delete("/:reviewId", async (req, res) => {

    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!req.isAuthenticated()) {
        req.flash("error", "You first must be logged in!");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You can delete only your own review!");
        return res.redirect(`/listings/${id}`);
    }

    await Listing.findByIdAndUpdate(id, {
        $pull: {
            reviews: reviewId
        }
    });

    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
});


module.exports = router;