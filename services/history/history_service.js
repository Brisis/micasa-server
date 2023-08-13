const ErrorHandler = require("../../utils/errorHandler");
const HistoryRepository = require("./history_repository");
const UserRepository = require("../user/user_repository");
const PropertyRepository = require("../property/property_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let historyRepository = new HistoryRepository();
let userRepository = new UserRepository();
let propertyRepository = new PropertyRepository();
let utils = new Utils();

class HistoryService {

    async registerHistory (req) {
        const {userId, propertyId} = req.params;

        const dbHistory = await historyRepository.findByUserAndProperty(userId, propertyId);

        if (dbHistory.length > 0) {
            return {message: "already added"};
        }

        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const dbProperty = await propertyRepository.findById(propertyId);

        if (dbProperty.length < 1) {
            throw new Error("property-not-found");
        }

        await historyRepository.create(
            userId,
            propertyId
        );

        return {message: "added"};
    }

    async deleteHistory(req) {
        const {userId, propertyId} = req.params;

        await historyRepository.delete(userId, propertyId);

        return {message: "deleted"};
    }

    async getHistory () {
        const history = await historyRepository.findAll();

        return history;
    }

    async getHistoryById (req) {
        const history = await historyRepository.findById(req.params.id);

        return history[0];
    }

    async getHistoryByUser (userId) {
        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const history = await historyRepository.findByUserId(userId);

        let userHistory = [];
        history.forEach((fav) => userHistory.push(fav.property_id));

        let historyProperties = [];
        for (let i = 0; i < userHistory.length; i++) {
            const dbProperty = await propertyRepository.findById(userHistory[i]);
            historyProperties.push(dbProperty[0]);
        }


        return historyProperties;
    }

}

module.exports = HistoryService;