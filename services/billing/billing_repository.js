const db = require("../../config/db")

class BillingRepository {
    async create (userId, balance, expireDate) {
        const [billing] = await db.execute(
            `
            INSERT INTO billing (user_id, balance, expire_date) 
            VALUES (?, ?, ?)
            `, [userId, balance, expireDate]
        );

        const createdBilling = await this.findById(billing.insertId)
    
        return createdBilling; 
    }

    async update (leaseId, balance, expireDate) {
        const [billing] = await db.execute(
            `
            UPDATE leases
            SET balance = ?,
                expire_date = ?
            WHERE id = ${leaseId};
            `, [balance, expireDate]
        );

        const updatedBilling = await this.findById(leaseId)
    
        return updatedBilling; 
    }

    async findById (billingId) {
        const [billing] = await db.execute(`
            SELECT * FROM billing WHERE id = ?;`, 
            [billingId]
        );

        return billing; 
    }

    async findByUserId (userId) {
        const [billing] = await db.execute(`
            SELECT * FROM billing 
            WHERE user_id = ?`,
            [userId]
        );

        return billing; 
    }

    async findAll () {
        const [billings] = await db.execute(`
            SELECT * FROM billing
            `
        );

        return billings;
    }
}

module.exports = BillingRepository;