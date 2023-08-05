const express = require("express");
const HistoryService = require("./history_service");
let historyService = new HistoryService();

const historyRouter = express.Router();

historyRouter.post("/create", async (req, res, next) => {
    try {
        const response = await historyService.registerHistory(req);

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

historyRouter.post("/search", async (req, res, next) => {
    try {
        const response = await historyService.getHistoryByName(req);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = historyRouter;