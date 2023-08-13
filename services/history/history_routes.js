const express = require("express");
const HistoryService = require("./history_service");
let historyService = new HistoryService();

const historyRouter = express.Router();

historyRouter.post("/create/property/:propertyId/user/:userId", async (req, res, next) => {
    try {
        const response = await historyService.registerHistory(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

historyRouter.delete("/delete/property/:propertyId/user/:userId", async (req, res, next) => {
    try {
        const response = await historyService.deleteHistory(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

historyRouter.get("/", async (req, res, next) => {
    try {
        const response = await historyService.getHistories();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

historyRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await historyService.getHistoryById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

historyRouter.get("/user/:userId", async (req, res, next) => {
    try {
        const response = await historyService.getHistoryByUser(req.params.userId);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = historyRouter;