const db = require("../../config/db")

class RentalRepository {
    async create (userId, propertyId, expireDate) {
        const [rental] = await db.execute(
            `
            INSERT INTO rentals (user_id, property_id, expire_date) 
            VALUES (?, ?, ?)
            `, [userId, propertyId, expireDate]
        );

        const createdRental = await this.findById(rental.insertId)
    
        return createdRental; 
    }

    async delete (userId, propertyId) {
        const [rental] = await db.execute(`
            DELETE FROM rentals WHERE user_id = ? AND property_id = ?;`, 
            [userId, propertyId]
        );

        return rental; 
    }

    async findById (rentalId) {
        const [rental] = await db.execute(`
            SELECT * FROM rentals WHERE id = ?;`, 
            [rentalId]
        );

        return rental; 
    }

    async findByUserId (userId) {
        const [rental] = await db.execute(`
            SELECT * FROM rentals 
            WHERE user_id = ?`, [userId]
        );

        return rental; 
    }

    async findByProperty (propertyId) {
        const [rental] = await db.execute(`
            SELECT * FROM rentals 
            WHERE property_id = ?`, [propertyId]
        );

        return rental; 
    }

    async findAll () {
        const [rentals] = await db.execute(`
            SELECT * FROM rentals
            `
        );

        return rentals;
    }
}

module.exports = RentalRepository;