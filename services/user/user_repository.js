const db = require("../../config/db")

class UserRepository {

    async update (userId, firstname, surname, dob, phone) {
        const [user] = await db.execute(
            `
            UPDATE users
            SET firstname = ?,
                surname = ?,
                dob = ?,
                phone = ?
            WHERE id = ?;
            `, [firstname, surname, dob, phone, userId]
        );

        const updatedUser = await this.findById(userId);
    
        return updatedUser; 
    }

    async updateLocation (userId, location_id) {
        const [user] = await db.execute(
            `
            UPDATE users
            SET location_id = ?
            WHERE id = ?;
            `, [location_id, userId]
        );

        const updatedUser = await this.findById(userId);
    
        return updatedUser; 
    }

    async findById (userId) {
        const [user] = await db.execute(`
            SELECT * FROM users WHERE id = ?;`, 
            [userId]
        );

        return user; 
    }

    async findAll () {
        const [users] = await db.execute(`
            SELECT * FROM users
            `
        );

        return users;
    }
    
}

module.exports = UserRepository;