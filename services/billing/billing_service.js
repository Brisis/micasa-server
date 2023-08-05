const ErrorHandler = require("../../utils/errorHandler");
const BillingRepository = require("./billing_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let billingRepository = new BillingRepository();
let utils = new Utils();

class BillingService {

    async registerBilling (req) {
        const validateRequest = errorHandler.handleBillingErrors(req);

        const {country, city, name, map_coordinates} = req.body;

        const dbBilling = await billingRepository.findByName(name);

        if (dbBilling.length > 0) {
            throw new Error("billing-already-registered");
        }

        const billing = await billingRepository.create(
            country,
            city,
            name, 
            map_coordinates == undefined ? null : map_coordinates
        );

        return billing[0];
    }

    async getBillings () {
        const billings = await billingRepository.findAll();

        return billings;
    }

    async getBillingById (req) {
        const billing = await billingRepository.findById(req.params.id);

        return billing[0];
    }

    async getBillingByName (req) {
        const billing = await billingRepository.findByName(req.body.name);

        if (billing.length < 1) {
            throw new Error("billing-not-found");
        }

        return billing;
    }

}

module.exports = BillingService;