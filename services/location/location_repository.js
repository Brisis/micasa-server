const db = require("../../config/db")

class LocationRepository {
    async createLocation (name, map_coordinates) {
        const [location] = await db.execute(
            `
            INSERT INTO locations (name, map_coordinates) 
            VALUES (?, ?)
            `, [name, map_coordinates]
        );

        const createdLocation = await this.findLocationById(location.insertId)
    
        return createdLocation; 
    }

    async findLocationById (locationId) {
        const [location] = await db.execute(`
            SELECT * FROM locations WHERE id = ?;`, 
            [locationId]
        );

        return location; 
    }

    async findLocationByName (locationName) {
        const [location] = await db.execute(`
            SELECT * FROM locations 
            WHERE LOWER(name) LIKE LOWER('%${locationName}%')`
        );

        return location; 
    }

    async findLocations () {
        const [locations] = await db.execute(`
            SELECT * FROM locations
            `
        );

        return locations;
    }
}

module.exports = LocationRepository;