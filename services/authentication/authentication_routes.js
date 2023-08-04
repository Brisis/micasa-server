const express = require("express");
const AuthenticationService = require("./authentication_service");
let authService = new AuthenticationService();

const authenticationRouter = express.Router();

authenticationRouter.post("/register", async (req, res, next) => {
    try {
        const response = await authService.registerUser(req);

        res.status(201).send(response);
    } catch (error) {
        next(error);
    }
});

authenticationRouter.post("/login", async (req, res, next) => {
    try {
        const response = await authService.login(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

authenticationRouter.post("/authenticate", async (req, res, next) => {
    try {
        const response = await authService.authenticate(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = authenticationRouter;