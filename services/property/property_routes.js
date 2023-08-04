const express = require("express");
const PropertyService = require("./property_service");
let propertyService = new PropertyService();

const propertyRouter = express.Router();

propertyRouter.get("/", async (req, res, next) => {
    try {
        res.status(200).send("response");
    } catch (error) {
        next(error);
    }
});

module.exports = propertyRouter;