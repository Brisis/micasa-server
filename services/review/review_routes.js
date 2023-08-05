const express = require("express");
const ReviewService = require("./review_service");
let reviewService = new ReviewService();

const reviewRouter = express.Router();

reviewRouter.post("/create", async (req, res, next) => {
    try {
        const response = await reviewService.registerReview(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

reviewRouter.get("/", async (req, res, next) => {
    try {
        const response = await reviewService.getReviews();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

reviewRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await reviewService.getReviewById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

reviewRouter.post("/search", async (req, res, next) => {
    try {
        const response = await reviewService.getReviewByName(req);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = reviewRouter;