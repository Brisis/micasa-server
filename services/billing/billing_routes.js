const express = require("express");
const BillingService = require("./billing_service");
let billingService = new BillingService();

const billingRouter = express.Router();

billingRouter.post("/create", async (req, res, next) => {
    try {
        const response = await billingService.registerBilling(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

billingRouter.get("/", async (req, res, next) => {
    try {
        const response = await billingService.getBillings();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

billingRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await billingService.getBillingById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

billingRouter.post("/search", async (req, res, next) => {
    try {
        const response = await billingService.getBillingByName(req);
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = billingRouter;