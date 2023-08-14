const ErrorHandler = require("../../utils/errorHandler");
const ReserveRepository = require("./reserve_repository");
const UserRepository = require("../user/user_repository");
const PropertyRepository = require("../property/property_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let reserveRepository = new ReserveRepository();
let userRepository = new UserRepository();
let propertyRepository = new PropertyRepository();
let utils = new Utils();

class ReserveService {

    async registerReserve (req) {
        // const validateRequest = errorHandler.handleReserveErrors(req);

        const {userId, propertyId, viewDate, comment} = req.body;

        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const dbProperty = await propertyRepository.findById(propertyId);

        if (dbProperty.length < 1) {
            throw new Error("property-not-found");
        }

        // const dbReserve = await reserveRepository.findByProperty(propertyId);

        // if (dbReserve.length > 0) {
        //     throw new Error("reserve-already-registered");
        // }

        await reserveRepository.create(
            userId,
            propertyId,
            viewDate,
            comment == undefined ? null : comment,
            "Active"
        );

        return {message: "reserved"};
    }

    async checkReservePermissions (req) {
        // const validateRequest = errorHandler.handleReserveErrors(req);

        const {userId, propertyId} = req.params;

        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const dbProperty = await propertyRepository.findById(propertyId);

        if (dbProperty.length < 1) {
            throw new Error("property-not-found");
        }

        const dbReserve = await reserveRepository.findByPropertyAndUser(userId, propertyId);
        
        if (dbReserve.length > 0) {
            return {message: "not allowed"};
        }

        return {message: "allowed"};
    }

    async deleteReserve (req) {
        const {userId, propertyId} = req.params;

        const dbReserve = await reserveRepository.findByProperty(propertyId);

        if (dbReserve.length > 0) {
            await reserveRepository.delete(userId, propertyId);

            return {message: "deleted"};
        }
        else {
            throw new Error("Reserve-not-found");
        }
    }

    async getReserves () {
        const reserves = await reserveRepository.findAll();

        return reserves;
    }

    async getReserveById (req) {
        const reserve = await reserveRepository.findById(req.params.id);

        return reserve[0];
    }

    async getReservesByUser (userId) {
        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const reserves = await reserveRepository.findByUserId(userId);

        let userReserves = [];
        reserves.forEach((reserve) => userReserves.push(reserve.property_id));

        let reservedProperties = [];
        for (let i = 0; i < userReserves.length; i++) {
            const dbProperty = await propertyRepository.findById(userReserves[i]);
            reservedProperties.push(dbProperty[0]);
        }


        return reservedProperties;
    }

}

module.exports = ReserveService;