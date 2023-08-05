const ErrorHandler = require("../../utils/errorHandler");
const HistoryRepository = require("./history_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let historyRepository = new HistoryRepository();
let utils = new Utils();

class HistoryService {

    async registerHistory (req) {
        const validateRequest = errorHandler.handleHistoryErrors(req);

        const {country, city, name, map_coordinates} = req.body;

        const dbHistory = await historyRepository.findByName(name);

        if (dbHistory.length > 0) {
            throw new Error("history-already-registered");
        }

        const history = await historyRepository.create(
            country,
            city,
            name, 
            map_coordinates == undefined ? null : map_coordinates
        );

        return history[0];
    }

    async getHistories () {
        const history = await historyRepository.findAll();

        return history;
    }

    async getHistoryById (req) {
        const history = await historyRepository.findById(req.params.id);

        return history[0];
    }

    async getHistoryByName (req) {
        const history = await historyRepository.findByName(req.body.name);

        if (history.length < 1) {
            throw new Error("history-not-found");
        }

        return history;
    }

}

module.exports = HistoryService;