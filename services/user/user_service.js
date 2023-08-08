const ErrorHandler = require("../../utils/errorHandler");
const UserRepository = require("./user_repository");
const LocationRepository = require("../location/location_repository");

const Utils = require("../../utils/utils");

let errorHandler = new ErrorHandler();
let userRepository = new UserRepository();
let locationRepository = new LocationRepository();
let utils = new Utils();

class UserService {
    async updateUser (req) {
        const {firstname, surname, dob, phone} = req.body;
        let userId = req.params.id;

        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const user = await userRepository.update(
            userId,
            firstname,
            surname,
            dob, 
            phone
        );

        return user[0];
    }

    async updateUserLocation (req) {
        const {location_id} = req.body;
        let userId = req.params.id;

        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const dbLocation = await locationRepository.findById(location_id);

        if (dbLocation.length < 1) {
            throw new Error("location-not-found");
        }

        const user = await userRepository.updateLocation(
            userId,
            location_id
        );

        return user[0];
    }

    async getUsers () {
        const users = await userRepository.findAll();

        return users;
    }

    async getUserById (req) {
        const user = await userRepository.findById(req.params.id);

        return user[0];
    }

}

module.exports = UserService;