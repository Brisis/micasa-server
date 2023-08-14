const express = require("express");
const ReserveService = require("./reserve_service");
let reserveService = new ReserveService();

const reserveRouter = express.Router();

reserveRouter.post("/create", async (req, res, next) => {
    try {
        const response = await reserveService.registerReserve(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

reserveRouter.post("/check/property/:propertyId/user/:userId", async (req, res, next) => {
    try {
        const response = await reserveService.checkReservePermissions(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

reserveRouter.delete("/delete/property/:propertyId/user/:userId", async (req, res, next) => {
    try {
        const response = await reserveService.deleteReserve(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

reserveRouter.get("/", async (req, res, next) => {
    try {
        const response = await reserveService.getReserves();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

reserveRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await reserveService.getReserveById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

reserveRouter.get("/user/:userId", async (req, res, next) => {
    try {
        const response = await reserveService.getReservesByUser(req.params.userId);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = reserveRouter;