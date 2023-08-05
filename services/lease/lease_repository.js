const db = require("../../config/db")

class LeaseRepository {
    async create (
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
        ) {
        const [lease] = await db.execute(
            `
            INSERT INTO leases (
                user_id,
                national_id,
                dob,
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
                ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
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
            ]
        );

        const createdLease = await this.findById(lease.insertId)
    
        return createdLease; 
    }

    async findById (leaseId) {
        const [lease] = await db.execute(`
            SELECT * FROM leases WHERE id = ?;`, 
            [leaseId]
        );

        return lease; 
    }

    async findByUser (userId) {
        const [lease] = await db.execute(`
            SELECT * FROM leases 
            WHERE user_id = ?`,
            [userId]
        );

        return lease; 
    }

    async findAll () {
        const [leases] = await db.execute(`
            SELECT * FROM leases
            `
        );

        return leases;
    }
}

module.exports = LeaseRepository;