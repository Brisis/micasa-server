const db = require("../../config/db")

class FavouriteRepository {
    async create (userId, propertyId) {
        const [favourite] = await db.execute(
            `
            INSERT INTO favourites (user_id, property_id) 
            VALUES (?, ?)
            `, [userId, propertyId]
        );

        const createdFavourite = await this.findById(favourite.insertId)
    
        return createdFavourite; 
    }

    async findById (favouriteId) {
        const [favourite] = await db.execute(`
            SELECT * FROM favourites WHERE id = ?;`, 
            [favouriteId]
        );

        return favourite; 
    }

    async findByUserId (userId) {
        const [favourites] = await db.execute(`
            SELECT * FROM favourites WHERE user_id = ?;`, 
            [userId]
        );

        return favourites; 
    }

    async delete (userId, propertyId) {
        const [favourite] = await db.execute(`
            DELETE FROM favourites WHERE user_id = ? AND property_id = ?;`, 
            [userId, propertyId]
        );

        return favourite; 
    }

    async findByUserAndProperty (userId, propertyId) {
        const [favourite] = await db.execute(`
            SELECT * FROM favourites WHERE user_id = ? AND property_id = ?;`, 
            [userId, propertyId]
        );

        return favourite; 
    }

    async findAll () {
        const [favourites] = await db.execute(`
            SELECT * FROM favourites
            `
        );

        return favourites;
    }
}

module.exports = FavouriteRepository;