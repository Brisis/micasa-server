const express = require("express");
const FavouriteService = require("./favourite_service");
let favouriteService = new FavouriteService();

const favouriteRouter = express.Router();

favouriteRouter.post("/create/property/:propertyId/user/:userId", async (req, res, next) => {
    try {
        const response = await favouriteService.registerFavourite(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

favouriteRouter.get("/", async (req, res, next) => {
    try {
        const response = await favouriteService.getFavourites();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

favouriteRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await favouriteService.getFavouriteById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

favouriteRouter.get("/user/:userId", async (req, res, next) => {
    try {
        const response = await favouriteService.getFavouritesByUser(req.params.userId);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = favouriteRouter;