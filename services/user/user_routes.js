const express = require("express");
const UserService = require("./user_service");
let userService = new UserService();

const userRouter = express.Router();

userRouter.put("/:id/update", async (req, res, next) => {
    try {
        const response = await userService.updateUser(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

userRouter.put("/:id/update_location", async (req, res, next) => {
    try {
        const response = await userService.updateUserLocation(req);

        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

userRouter.get("/", async (req, res, next) => {
    try {
        const response = await userService.getUsers();
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

userRouter.get("/:id", async (req, res, next) => {
    try {
        const response = await userService.getUserById(req);
        
        res.status(200).send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = userRouter;