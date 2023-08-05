const express = require("express");
const FavouriteService = require("./favourite_service");
let favouriteService = new FavouriteService();

const favouriteRouter = express.Router();

favouriteRouter.post("/create", async (req, res, next) => {
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

favouriteRouter.post("/search", async (req, res, next) => {
    try {
        const response = await favouriteService.getFavouriteByName(req);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = favouriteRouter;