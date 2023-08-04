require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const authenticationRouter = require("./services/authentication/authentication_routes");
const userRouter = require("./services/user/user_routes");
const locationRouter = require("./services/location/location_routes");
const propertyRouter = require("./services/property/property_routes");

const app = express();

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.static(path.join(__dirname, './uploads')));


/* Routes */

//auth
app.use("/auth", authenticationRouter);

//user
app.use("/users", userRouter);

//location
app.use("/locations", locationRouter);

//property
app.use("/properties", propertyRouter);


/* Error handler middleware */
// app.use(errorHandler);
app.use((err, req, res, next) => {
    // console.error(err.stack)
    res.status(500).send(err.message)
});

// Listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
