const db = require("../../config/db")

class BillingRepository {
    async create (userId, balance, status) {
        const [billing] = await db.execute(
            `
            INSERT INTO billing (user_id, balance, status) 
            VALUES (?, ?, ?)
            `, [userId, balance, status]
        );

        const createdBilling = await this.findById(billing.insertId)
    
        return createdBilling; 
    }

    async update (billingId, balance, status) {
        const [billing] = await db.execute(
            `
            UPDATE billing
            SET balance = ?,
                status = ?
            WHERE id = ${billingId};
            `, [balance, status]
        );

        const updatedBilling = await this.findById(billingId)
    
        return updatedBilling; 
    }

    async updatePaid (billingId, status, expireDate) {
        const [billing] = await db.execute(
            `
            UPDATE billing
            SET status = ?,
                expire_date = ?
            WHERE id = ${billingId};
            `, [status, expireDate]
        );

        const updatedBilling = await this.findById(billingId)
    
        return updatedBilling; 
    }

    async updateUnPaid (billingId, status, expireDate) {
        const [billing] = await db.execute(
            `
            UPDATE billing
            SET status = ?,
                expire_date = ?
            WHERE id = ${billingId};
            `, [status, expireDate]
        );

        const updatedBilling = await this.findById(billingId)
    
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