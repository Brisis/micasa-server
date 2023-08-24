const db = require("../../config/db")

class LocationRepository {
    async createLocation (country, city, name, map_coordinates) {
        const [location] = await db.execute(
            `
            INSERT INTO locations (country, city, name, map_coordinates) 
            VALUES (?, ?, ?, ?)
            `, [country, city, name, map_coordinates]
        );

        const createdLocation = await this.findById(location.insertId)
    
        return createdLocation; 
    }

    async findById (locationId) {
        const [location] = await db.execute(`
            SELECT * FROM locations WHERE id = ?;`, 
            [locationId]
        );

        return location; 
    }

    async findByName (locationName) {
        const [location] = await db.execute(`
            SELECT * FROM locations 
            WHERE LOWER(name) LIKE LOWER('%${locationName}%')
            OR LOWER(city) LIKE LOWER('%${locationName}%')
            OR LOWER(country) LIKE LOWER('%${locationName}%')
        `    
        );

        return location; 
    }

    async findAll () {
        const [locations] = await db.execute(`
            SELECT * FROM locations
            `
        );

        return locations;
    }
}

module.exports = LocationRepository;