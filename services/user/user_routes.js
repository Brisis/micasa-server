const express = require("express");
const UserService = require("./user_service");
let userService = new UserService();

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
    try {
        res.status(200).send("response");
    } catch (error) {
        next(error);
    }
});

module.exports = userRouter;