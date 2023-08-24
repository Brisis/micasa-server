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
                familySize,
                nextOfKin,
                nextOfKinPhoneNumber,
                nextOfKinAddress,
                signature
                ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

    async update (
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
        ) {
        const [lease] = await db.execute(
            `
            UPDATE leases
                SET occupation = ?, 
                    periodEmployedInMonths = ?,
                    employerName = ?,
                    salary = ?,
                    businessAddress = ?,
                    currentHomeAddress = ?,
                    familySize = ?,
                    nextOfKin = ?,
                    nextOfKinPhoneNumber = ?,
                    nextOfKinAddress = ?
                WHERE id = ${leaseId};
            `, [
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
            ]
        );

        const updatedLease = await this.findById(leaseId)
    
        return updatedLease; 
    }

    async findById (leaseId) {
        const [lease] = await db.execute(`
            SELECT * FROM leases WHERE id = ?;`, 
            [leaseId]
        );

        return lease; 
    }

    async findByUserId (userId) {
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