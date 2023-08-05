const ErrorHandler = require("../../utils/errorHandler");
const LocationRepository = require("./location_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let locationRepository = new LocationRepository();
let utils = new Utils();

class LocationService {

    async registerLocation (req) {
        const validateRequest = errorHandler.handleLocationErrors(req);

        const {country, city, name, map_coordinates} = req.body;

        const dbLocation = await locationRepository.findByName(name);

        if (dbLocation.length > 0) {
            throw new Error("location-already-registered");
        }

        const location = await locationRepository.createLocation(
            country,
            city,
            name, 
            map_coordinates == undefined ? null : map_coordinates
        );

        return location[0];
    }

    async getLocations () {
        const locations = await locationRepository.findAll();

        return locations;
    }

    async getLocationById (req) {
        const location = await locationRepository.findById(req.params.id);

        return location[0];
    }

    async getLocationByName (req) {
        const location = await locationRepository.findByName(req.body.name);

        if (location.length < 1) {
            throw new Error("location-not-found");
        }

        return location;
    }

}

module.exports = LocationService;