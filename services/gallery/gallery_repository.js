const db = require("../../config/db")

class GalleryRepository {
    async create (image_thumbnail, image_original, property_id) {
        const [image] = await db.execute(
            `
            INSERT INTO gallery (image_thumbnail, image_original, property_id) 
            VALUES (?, ?, ?)
            `, [image_thumbnail, image_original, property_id]
        );

        const createdImage = await this.findById(image.insertId)
    
        return createdImage; 
    }

    async findById (imageId) {
        const [image] = await db.execute(`
            SELECT * FROM gallery WHERE id = ?;`, 
            [imageId]
        );

        return image; 
    }

    async findByName (imageName) {
        const [image] = await db.execute(`
            SELECT * FROM gallery 
            WHERE LOWER(name) LIKE LOWER('%${imageName}%')`
        );

        return image; 
    }

    async findAll () {
        const [images] = await db.execute(`
            SELECT * FROM gallery
            `
        );

        return images;
    }
}

module.exports = GalleryRepository;