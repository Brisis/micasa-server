const ErrorHandler = require("../../utils/errorHandler");
const LeaseRepository = require("./lease_repository");
const UserRepository = require("../user/user_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let leaseRepository = new LeaseRepository();
let userRepository = new UserRepository();
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
            familySize,
            nextOfKin,
            nextOfKinPhoneNumber,
            nextOfKinAddress,
            signature
        } = req.body;

        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        if (dbUser[0].lease_id != null) {
            throw new Error("user-already-has-lease"); 
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
            familySize,
            nextOfKin,
            nextOfKinPhoneNumber,
            nextOfKinAddress,
            signature
        );

        return lease[0];
    }

    async updateLease (req) {
        const validateRequest = errorHandler.handleLeaseUpdateErrors(req);

        const {
            occupation,
            periodEmployedInMonths,
            employerName,
            salary,
            businessAddress,
            currentHomeAddress,
            familySize,
            nextOfKin,
            nextOfKinPhoneNumber,
            nextOfKinAddress,
        } = req.body;

        let leaseId = req.params.leaseId;

        const dbLease = await leaseRepository.findById(leaseId);

        if (dbLease.length < 1) {
            throw new Error("lease-not-found");
        }

        const lease = await leaseRepository.update(
            leaseId,
            occupation,
            periodEmployedInMonths,
            employerName,
            salary,
            businessAddress,
            currentHomeAddress,
            familySize,
            nextOfKin,
            nextOfKinPhoneNumber,
            nextOfKinAddress
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

    async getLeaseByUserId (req) {
        const lease = await leaseRepository.findByUserId(req.params.userId);

        if (lease.length < 1) {
            throw new Error("lease-not-found");
        }

        return lease[0];
    }

}

module.exports = LeaseService;