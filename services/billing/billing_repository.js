const db = require("../../config/db")

class BillingRepository {
    async create (country, city, name, map_coordinates) {
        const [billing] = await db.execute(
            `
            INSERT INTO billing (country, city, name, map_coordinates) 
            VALUES (?, ?, ?, ?)
            `, [country, city, name, map_coordinates]
        );

        const createdBilling = await this.findById(billing.insertId)
    
        return createdBilling; 
    }

    async findById (billingId) {
        const [billing] = await db.execute(`
            SELECT * FROM billing WHERE id = ?;`, 
            [billingId]
        );

        return billing; 
    }

    async findByName (billingName) {
        const [billing] = await db.execute(`
            SELECT * FROM billing 
            WHERE LOWER(name) LIKE LOWER('%${billingName}%')`
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