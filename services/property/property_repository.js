const db = require("../../config/db")

class LocationRepository {
    async createProperty (
        name,
        locationId,
        description,
        amenities,
        category,
        price,
        status,
        purpose
        ) {
        const [property] = await db.execute(
            `
            INSERT INTO properties (name,  
                location_id,
                description,
                amenities,
                category,
                price,
                status,
                purpose
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [name, locationId, description, amenities, category, price, status, purpose]
        );

        const createdProperty = await this.findById(property.insertId)
    
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

    async findByName (propertyName) {
        const [property] = await db.execute(`
            SELECT * FROM properties 
            WHERE LOWER(name) LIKE LOWER('%${propertyName}%')`
        );

        return property; 
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