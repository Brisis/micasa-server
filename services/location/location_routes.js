const express = require("express");
const LocationService = require("./location_service");
let locationService = new LocationService();

const locationRouter = express.Router();

locationRouter.post("/create", async (req, res, next) => {
    try {
        const response = await locationService.registerLocation(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

locationRouter.get("/", async (req, res, next) => {
    try {
        const response = await locationService.getLocations();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

locationRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await locationService.getLocationById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

locationRouter.post("/search", async (req, res, next) => {
    try {
        const response = await locationService.getLocationByName(req);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = locationRouter;