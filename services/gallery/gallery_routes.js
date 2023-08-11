const express = require("express");
const GalleryService = require("./gallery_service");
const Utils = require("../../utils/utils");

let galleryService = new GalleryService();
const galleryRouter = express.Router();
let utils = new Utils();

galleryRouter.post("/create/property/:id", utils.uploadMiddleware().single('image'), async (req, res, next) => {
    try {

        const response = await galleryService.addImage(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

galleryRouter.get("/", async (req, res, next) => {
    try {
        const response = await galleryService.getImages();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

galleryRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await galleryService.getImageById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

galleryRouter.get("/property/:propertyId", async (req, res, next) => {
    try {
        const response = await galleryService.getImagesByPropertyId(req.params.propertyId);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = galleryRouter;