const express = require("express");
const RentalService = require("./rental_service");
let rentalService = new RentalService();

const rentalRouter = express.Router();

rentalRouter.post("/create", async (req, res, next) => {
    try {
        const response = await rentalService.registerRental(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

rentalRouter.delete("/delete/property/:propertyId/user/:userId", async (req, res, next) => {
    try {
        const response = await rentalService.deleteRental(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

rentalRouter.get("/", async (req, res, next) => {
    try {
        const response = await rentalService.getRentals();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

rentalRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await rentalService.getRentalById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

rentalRouter.get("/user/:userId", async (req, res, next) => {
    try {
        const response = await rentalService.getRentalsByUser(req.params.userId);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = rentalRouter;