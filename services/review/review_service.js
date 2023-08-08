const ErrorHandler = require("../../utils/errorHandler");
const ReviewRepository = require("./review_repository");
const Utils = require("../../utils/utils");

let errorHandler = new ErrorHandler();
let reviewRepository = new ReviewRepository();
let utils = new Utils();

class ReviewService {

    async registerReview (req) {
        const validateRequest = errorHandler.handleReviewErrors(req);

        const {country, city, name, map_coordinates} = req.body;

        const dbReview = await reviewRepository.findByName(name);

        if (dbReview.length > 0) {
            throw new Error("Review-already-registered");
        }

        const Review = await reviewRepository.create(
            country,
            city,
            name, 
            map_coordinates == undefined ? null : map_coordinates
        );

        return Review[0];
    }

    async getReviews () {
        const Reviews = await reviewRepository.findAll();

        return Reviews;
    }

    async getReviewById (req) {
        const Review = await reviewRepository.findById(req.params.id);

        return Review[0];
    }

    async getReviewByName (req) {
        const Review = await reviewRepository.findByName(req.body.name);

        if (Review.length < 1) {
            throw new Error("Review-not-found");
        }

        return Review;
    }

}

module.exports = ReviewService;