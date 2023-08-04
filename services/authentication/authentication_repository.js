const db = require("../../config/db")

class AuthenticationRepository {

    async createUser (email, hashedPassword) {
        const [user] = await db.execute(
            `
            INSERT INTO users (email, password) 
            VALUES (?, ?)
            `, [email, hashedPassword]
        );

        const createdUser = await this.getUserById(user.insertId)
    
        return createdUser; 
    }

    async getUserByEmail (email) {
        const [user] = await db.execute(`
            SELECT * FROM users WHERE LOWER(email) = LOWER(?)`, 
            [email]
        );

        return user; 
    }

    async getUserById (userId) {
        const [user] = await db.execute(`
            SELECT * FROM users WHERE id = ?;`, 
            [userId]
        );

        return user; 
    }
}

module.exports = AuthenticationRepository;