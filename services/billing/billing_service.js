const ErrorHandler = require("../../utils/errorHandler");
const BillingRepository = require("./billing_repository");
const UserRepository = require("../user/user_repository");
const Utils = require("../../utils/utils");

let errorHandler = new ErrorHandler();
let billingRepository = new BillingRepository();
let userRepository = new UserRepository();
let utils = new Utils();

class BillingService {

    async registerBilling (req) {
        // const validateRequest = errorHandler.handleBillingErrors(req);

        const {balance, expireDate} = req.body;
        let userId = req.params.userId;

        if (
            balance == undefined || 
            expireDate == undefined || 
            userId == undefined
        ) {
            throw new Error("missing-fields-required");
        }

        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const dbBilling = await billingRepository.findByUserId(userId);

        if (dbBilling.length > 0) {
            throw new Error("billing-already-registered"); 
        }

        const billing = await billingRepository.create(
            userId, 
            balance, 
            expireDate
        );

        return billing[0];
    }

    async updateBilling (req) {
        const validateRequest = errorHandler.handleBillingUpdateErrors(req);

        const {balance, expireDate} = req.body;
        let leaseId = req.params.leaseId;

        const dbBilling = await billingRepository.findById(leaseId);

        if (dbBilling.length < 1) {
            throw new Error("billing-not-found"); 
        }

        const billing = await billingRepository.update(
            leaseId, 
            balance, 
            expireDate
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

    async getBillingByUserId (req) {
        const billing = await billingRepository.findByUserId(req.params.userId);

        if (billing.length < 1) {
            throw new Error("billing-not-found");
        }

        return billing[0];
    }

}

module.exports = BillingService;