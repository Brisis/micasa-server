const db = require("../../config/db")

class FavouriteRepository {
    async createFavourite (country, city, name, map_coordinates) {
        const [favourite] = await db.execute(
            `
            INSERT INTO favourites (country, city, name, map_coordinates) 
            VALUES (?, ?, ?, ?)
            `, [country, city, name, map_coordinates]
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

    async findByName (favouriteName) {
        const [favourite] = await db.execute(`
            SELECT * FROM favourites 
            WHERE LOWER(name) LIKE LOWER('%${favouriteName}%')`
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