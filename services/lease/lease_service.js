const ErrorHandler = require("../../utils/errorHandler");
const LeaseRepository = require("./lease_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let leaseRepository = new LeaseRepository();
let utils = new Utils();

class LeaseService {

    async registerLease (req) {
        const validateRequest = errorHandler.handleLeaseErrors(req);

        const {
            userId,
            nationalId,
            dateOfBirth,
            occupation,
            periodEmployedInMonths,
            employerName,
            salary,
            businessAddress,
            phoneNumber,
            currentHomeAddress,
            homePhoneNumber,
            familySize,
            nextOfKin,
            nextOfKinPhoneNumber,
            nextOfKinAddress,
            signature
        } = req.body;

        const dbLease = await leaseRepository.findByUser(userId);

        if (dbLease.length > 0) {
            throw new Error("lease-already-registered");
        }

        const lease = await leaseRepository.create(
            userId,
            nationalId,
            dateOfBirth,
            occupation,
            periodEmployedInMonths,
            employerName,
            salary,
            businessAddress,
            phoneNumber,
            currentHomeAddress,
            homePhoneNumber,
            familySize,
            nextOfKin,
            nextOfKinPhoneNumber,
            nextOfKinAddress,
            signature
        );

        return lease[0];
    }

    async getLeases () {
        const leases = await leaseRepository.findAll();

        return leases;
    }

    async getLeaseById (req) {
        const lease = await leaseRepository.findById(req.params.id);

        return lease[0];
    }

    async getLeaseByName (req) {
        const lease = await leaseRepository.findByName(req.body.name);

        if (lease.length < 1) {
            throw new Error("lease-not-found");
        }

        return lease;
    }

}

module.exports = LeaseService;