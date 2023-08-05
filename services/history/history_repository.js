const db = require("../../config/db")

class HistoryRepository {
    async createHistory (country, city, name, map_coordinates) {
        const [history] = await db.execute(
            `
            INSERT INTO history (country, city, name, map_coordinates) 
            VALUES (?, ?, ?, ?)
            `, [country, city, name, map_coordinates]
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

    async findByName (historyName) {
        const [history] = await db.execute(`
            SELECT * FROM history 
            WHERE LOWER(name) LIKE LOWER('%${historyName}%')`
        );

        return history; 
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