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
const rentalRouter = require("./services/rentals/rental_routes");
const billingRouter = require("./services/billing/billing_routes");
const galleryRouter = require("./services/gallery/gallery_routes");
const reviewRouter = require("./services/review/review_routes");
const favouriteRouter = require("./services/favourite/favourite_routes");
const historyRouter = require("./services/history/history_routes");
const leaseRouter = require("./services/lease/lease_routes");

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

//lease
app.use("/leases", leaseRouter);

//history
app.use("/history", historyRouter);

//favourites
app.use("/favourites", favouriteRouter);

//reviews
app.use("/reviews", reviewRouter);

//gallery
app.use("/gallery", galleryRouter);

//billing
app.use("/billing", billingRouter);

//rentals
app.use("/rentals", rentalRouter);

/* Error handler middleware */
// app.use(errorHandler);
app.use((err, req, res, next) => {
    // console.error(err.stack)
    res.status(500).send(err.message)
});

// Listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
