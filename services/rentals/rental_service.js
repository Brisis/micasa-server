const ErrorHandler = require("../../utils/errorHandler");
const RentalRepository = require("./rental_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let rentalRepository = new RentalRepository();
let utils = new Utils();

class RentalService {

    async registerRental (req) {
        const validateRequest = errorHandler.handleRentalErrors(req);

        const {country, city, name, map_coordinates} = req.body;

        const dbRental = await rentalRepository.findByName(name);

        if (dbRental.length > 0) {
            throw new Error("rental-already-registered");
        }

        const rental = await rentalRepository.create(
            country,
            city,
            name, 
            map_coordinates == undefined ? null : map_coordinates
        );

        return rental[0];
    }

    async getRentals () {
        const rentals = await rentalRepository.findAll();

        return rentals;
    }

    async getRentalById (req) {
        const rental = await rentalRepository.findById(req.params.id);

        return rental[0];
    }

    async getRentalByName (req) {
        const rental = await rentalRepository.findByName(req.body.name);

        if (rental.length < 1) {
            throw new Error("rental-not-found");
        }

        return rental;
    }

}

module.exports = RentalService;