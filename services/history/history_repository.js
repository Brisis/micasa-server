const db = require("../../config/db")

class HistoryRepository {
    async create (user_id, property_id) {
        const [history] = await db.execute(
            `
            INSERT INTO history (user_id, property_id) 
            VALUES (?, ?)
            `, [user_id, property_id]
        );

        const createdHistory = await this.findById(history.insertId)
    
        return createdHistory; 
    }

    async findById (historyId) {
        const [history] = await db.execute(`
            SELECT * FROM history WHERE id = ?;`, 
            [historyId]
        );

        return history; 
    }

    async findByUserId (userId) {
        const [favourites] = await db.execute(`
            SELECT * FROM history WHERE user_id = ?;`, 
            [userId]
        );

        return favourites; 
    }

    async delete (userId, propertyId) {
        const [favourite] = await db.execute(`
            DELETE FROM history WHERE user_id = ? AND property_id = ?;`, 
            [userId, propertyId]
        );

        return favourite; 
    }

    async findByUserAndProperty (userId, propertyId) {
        const [favourite] = await db.execute(`
            SELECT * FROM history WHERE user_id = ? AND property_id = ?;`, 
            [userId, propertyId]
        );

        return favourite; 
    }

    async findAll () {
        const [history] = await db.execute(`
            SELECT * FROM history
            `
        );

        return history;
    }
}

module.exports = HistoryRepository;