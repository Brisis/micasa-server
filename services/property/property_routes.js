const express = require("express");
const PropertyService = require("./property_service");
let propertyService = new PropertyService();

const propertyRouter = express.Router();

propertyRouter.post("/create", async (req, res, next) => {
    try {
        const response = await propertyService.registerProperty(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

propertyRouter.get("/", async (req, res, next) => {
    try {

        const searchQuery = req.query.searchQuery;

        if (searchQuery != undefined) {
            const response = await propertyService.getPropertiesSearchResults(searchQuery);

            res.status(200).send(response);
        } else {
            const response = await propertyService.getProperties();

            res.status(200).send(response);
        }
    } catch (error) {
        next(error);
    }
});

propertyRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await propertyService.getPropertyById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

propertyRouter.post("/search", async (req, res, next) => {
    try {
        const response = await propertyService.getPropertyByName(req);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

propertyRouter.get('/:id/images', async (req, res, next) => {
    try {
        const id = req.params.id;

        const response = await propertyService.getPropertyImages(id)
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

propertyRouter.get('/:id/set/:imageId', async (req, res, next) => {
    try {
        const propertyId = req.params.id 
        const imageId = req.params.imageId
    
        const response = await propertyService.setCoverImage(propertyId, imageId)
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

propertyRouter.get('/', async (req, res, next) => {
    try {
        const searchQuery = req.query.searchQuery;

        console.log(searchQuery);

        const response = await propertyService.getPropertiesSearchResults(searchQuery);

        console.log(response);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = propertyRouter;