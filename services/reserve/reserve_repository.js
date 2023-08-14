const db = require("../../config/db")

class ReserveRepository {
    async create (userId, propertyId, viewDate, comment, status) {
        const [reserve] = await db.execute(
            `
            INSERT INTO reserves (user_id, property_id, view_date, comment, status) 
            VALUES (?, ?, ?, ?, ?)
            `, [userId, propertyId, viewDate, comment, status]
        );

        const createdReserve = await this.findById(reserve.insertId)
    
        return createdReserve; 
    }

    async delete (userId, propertyId) {
        const [reserve] = await db.execute(`
            DELETE FROM reserves WHERE user_id = ? AND property_id = ?;`, 
            [userId, propertyId]
        );

        return reserve; 
    }
    

    async findByPropertyAndUser (userId, propertyId) {
        const [reserve] = await db.execute(`
        SELECT * FROM reserves WHERE user_id = ? AND property_id = ?;`, 
            [userId, propertyId]
        );

        return reserve; 
    }

    async findById (reserveId) {
        const [reserve] = await db.execute(`
            SELECT * FROM reserves WHERE id = ?;`, 
            [reserveId]
        );

        return reserve; 
    }

    async findByUser (userId) {
        const [reserve] = await db.execute(`
            SELECT * FROM reserves 
            WHERE user_id = ?`, [userId]
        );

        return reserve; 
    }

    async findByProperty (propertyId) {
        const [reserve] = await db.execute(`
            SELECT * FROM reserves 
            WHERE property_id = ?`, [propertyId]
        );

        return reserve; 
    }

    async findAll () {
        const [reserves] = await db.execute(`
            SELECT * FROM reserves
            `
        );

        return reserves;
    }
}

module.exports = ReserveRepository;