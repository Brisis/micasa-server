const db = require("../../config/db")

class LocationRepository {
    async createProperty (
        name,
        propertyID,
        locationId,
        location_name,
        description,
        amenities,
        category,
        price,
        status,
        purpose
        ) {
        const [property] = await db.execute(
            `
            INSERT INTO properties (
                name,  
                propertyID,
                location_id,
                location_name,
                description,
                amenities,
                category,
                price,
                status,
                purpose
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [name, propertyID, locationId, location_name, description, amenities, category, price, status, purpose]
        );

        const createdProperty = await this.findById(property.insertId);

    
        return createdProperty; 
    }

    async updateCoverImage (propertyId, imageUrl) {
        const [result] = await db.execute(
            `
                UPDATE properties
                SET cover_image = ?
                WHERE id = ?;
            `, 
            [imageUrl, propertyId]
        );

        return result;
    }

    async findById (propertyId) {
        const [property] = await db.execute(`
            SELECT * FROM properties WHERE id = ?;`, 
            [propertyId]
        );

        return property; 
    }

    async findByPropertyId (propertyID) {
        const [property] = await db.execute(`
            SELECT * FROM properties 
            WHERE LOWER(propertyID) LIKE LOWER('%${propertyID}%')`
        );

        return property; 
    }

    async findByLocation (location_id) {
        const [properties] = await db.execute(`
            SELECT * FROM properties 
            WHERE location_id = ?
            `, [location_id]
        );

        return properties; 
    }

    async findByName (query) {
        const [properties] = await db.execute(`
            SELECT * FROM properties 
            WHERE LOWER(name) LIKE LOWER('%${query}%')`
        );

        return properties; 
    }

    async findAll () {
        const [properties] = await db.execute(`
            SELECT * FROM properties
            `
        );

        return properties;
    }
}

module.exports = LocationRepository;