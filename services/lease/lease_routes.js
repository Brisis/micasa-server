const express = require("express");
const LeaseService = require("./lease_service");
let leaseService = new LeaseService();

const leaseRouter = express.Router();

leaseRouter.post("/create", async (req, res, next) => {
    try {
        const response = await leaseService.registerLease(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

leaseRouter.get("/", async (req, res, next) => {
    try {
        const response = await leaseService.getLeases();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

leaseRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await leaseService.getLeaseById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

leaseRouter.post("/search", async (req, res, next) => {
    try {
        const response = await leaseService.getLeaseByName(req);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = leaseRouter;