const express = require("express");
const BillingService = require("./billing_service");
let billingService = new BillingService();

const billingRouter = express.Router();

billingRouter.post("/create/:userId", async (req, res, next) => {
    try {
        const response = await billingService.registerBilling(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

billingRouter.put("/:billingId/update", async (req, res, next) => {
    try {
        const response = await billingService.updateBilling(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

billingRouter.put("/:billingId/pay", async (req, res, next) => {
    try {
        const response = await billingService.updateBillingPay(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

billingRouter.put("/:billingId/unpay", async (req, res, next) => {
    try {
        const response = await billingService.updateBillingUnPay(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

billingRouter.delete("/:leaseId/pay", async (req, res, next) => {
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

billingRouter.get("/user/:userId", async (req, res, next) => {
    try {
        const response = await billingService.getBillingByUserId(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = billingRouter;