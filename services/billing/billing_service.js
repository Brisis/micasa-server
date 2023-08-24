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

        const {balance} = req.body;
        let userId = req.params.userId;

        if (
            balance == undefined || 
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

        let status = "UnPaid";

        const billing = await billingRepository.create(
            userId, 
            balance, 
            status
        );

        return billing[0];
    }

    async updateBilling (req) {
        //const validateRequest = errorHandler.handleBillingUpdateErrors(req);

        const {balance} = req.body;
        let billingId = req.params.billingId;

        if (
            balance == undefined || 
            billingId == undefined
        ) {
            throw new Error("missing-fields-required");
        }

        const dbBilling = await billingRepository.findById(billingId);

        if (dbBilling.length < 1) {
            throw new Error("billing-not-found"); 
        }

        let status = "UnPaid";

        const billing = await billingRepository.update(
            billingId, 
            balance, 
            status
        );

        return billing[0];
    }

    async updateBillingPay (req) {
        let billingId = req.params.billingId;

        if (
            billingId == undefined
        ) {
            throw new Error("missing-fields-required");
        }

        const dbBilling = await billingRepository.findById(billingId);

        if (dbBilling.length < 1) {
            throw new Error("billing-not-found"); 
        }


        let date = new Date();
        date.setMonth(date.getMonth() + 1);

        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset*60*1000))
        let expireDate =  date.toISOString().split('T')[0]

        let status = "Paid";

        const billing = await billingRepository.updatePaid(
            billingId, 
            status,
            expireDate
        );

        return billing[0];
    }

    async updateBillingUnPay (req) {
        let billingId = req.params.billingId;

        if (
            billingId == undefined
        ) {
            throw new Error("missing-fields-required");
        }

        const dbBilling = await billingRepository.findById(billingId);

        if (dbBilling.length < 1) {
            throw new Error("billing-not-found"); 
        }

        let status = "UnPaid";

        const billing = await billingRepository.updateUnPaid(
            billingId, 
            status,
            null
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