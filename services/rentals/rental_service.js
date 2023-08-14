const ErrorHandler = require("../../utils/errorHandler");
const RentalRepository = require("./rental_repository");
const UserRepository = require("../user/user_repository");
const PropertyRepository = require("../property/property_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let rentalRepository = new RentalRepository();
let userRepository = new UserRepository();
let propertyRepository = new PropertyRepository();
let utils = new Utils();

class RentalService {

    async registerRental (req) {
        // const validateRequest = errorHandler.handleRentalErrors(req);

        const {userId, propertyId, expireDate} = req.body;

        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const dbProperty = await propertyRepository.findById(propertyId);

        if (dbProperty.length < 1) {
            throw new Error("property-not-found");
        }

        await propertyRepository.updateStatus(
            propertyId,
            expireDate == undefined? "Sold" : "Rented",
            expireDate == undefined ? null : expireDate
        );

        const dbRental = await rentalRepository.findByProperty(propertyId);

        if (dbRental.length > 0) {
            throw new Error("rental-already-registered");
        }

        const rental = await rentalRepository.create(
            userId,
            propertyId,
            expireDate == undefined ? null : expireDate
        );

        return rental[0];
    }

    async deleteRental (req) {
        const {userId, propertyId} = req.params;

        const dbRental = await rentalRepository.findByProperty(propertyId);

        if (dbRental.length > 0) {
            await rentalRepository.delete(userId, propertyId);

            return {message: "deleted"};
        }
        else {
            throw new Error("rental-not-found");
        }
    }

    async getRentals () {
        const rentals = await rentalRepository.findAll();

        return rentals;
    }

    async getRentalById (req) {
        const rental = await rentalRepository.findById(req.params.id);

        return rental[0];
    }

    async getRentalsByUser (userId) {
        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const rentals = await rentalRepository.findByUserId(userId);

        let userRentals = [];
        rentals.forEach((rental) => userRentals.push(rental.property_id));

        let rentedProperties = [];
        for (let i = 0; i < userRentals.length; i++) {
            const dbProperty = await propertyRepository.findById(userRentals[i]);
            rentedProperties.push(dbProperty[0]);
        }


        return rentedProperties;
    }

}

module.exports = RentalService;