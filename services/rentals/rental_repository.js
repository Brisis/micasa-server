const db = require("../../config/db")

class RentalRepository {
    async create (country, city, name, map_coordinates) {
        const [rental] = await db.execute(
            `
            INSERT INTO rentals (country, city, name, map_coordinates) 
            VALUES (?, ?, ?, ?)
            `, [country, city, name, map_coordinates]
        );

        const createdRental = await this.findById(rental.insertId)
    
        return createdRental; 
    }

    async findById (rentalId) {
        const [rental] = await db.execute(`
            SELECT * FROM rentals WHERE id = ?;`, 
            [rentalId]
        );

        return rental; 
    }

    async findByName (rentalName) {
        const [rental] = await db.execute(`
            SELECT * FROM rentals 
            WHERE LOWER(name) LIKE LOWER('%${rentalName}%')`
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