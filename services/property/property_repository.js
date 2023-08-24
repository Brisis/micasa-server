const db = require("../../config/db")

class LocationRepository {
    async create (
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

    async update (
        name,
        propertyId,
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
            UPDATE leases
            SET name = ?,  
                location_id = ?,
                location_name = ?,
                description = ?,
                amenities = ?,
                category = ?,
                price = ?,
                status = ?,
                purpose = ?
            WHERE id = ${propertyId};
            `, [name, locationId, location_name, description, amenities, category, price, status, purpose]
        );

        const updatedProperty = await this.findById(propertyId);

    
        return updatedProperty; 
    }

    async delete (propertyId) {
        const [property] = await db.execute(`
            DELETE FROM properties WHERE id = ?;`, 
            [propertyId]
        );

        return property; 
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

    async updateStatus (propertyId, status, expireDate) {
        const [result] = await db.execute(
            `
                UPDATE properties
                SET status = ?,
                    status_expire_date = ?
                WHERE id = ?;
            `, 
            [status, expireDate, propertyId]
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

    async findByAmenities (filterType) {
        const [properties] = await db.execute(`
            SELECT * FROM properties 
            WHERE LOWER(name) LIKE LOWER('%${filterType}%')`
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