const db = require("../../config/db")

class ReviewRepository {
    async create (country, city, name, map_coordinates) {
        const [review] = await db.execute(
            `
            INSERT INTO reviews (country, city, name, map_coordinates) 
            VALUES (?, ?, ?, ?)
            `, [country, city, name, map_coordinates]
        );

        const createdReview = await this.findById(review.insertId)
    
        return createdReview; 
    }

    async findById (reviewId) {
        const [review] = await db.execute(`
            SELECT * FROM reviews WHERE id = ?;`, 
            [reviewId]
        );

        return review; 
    }

    async findByName (reviewName) {
        const [review] = await db.execute(`
            SELECT * FROM reviews 
            WHERE LOWER(name) LIKE LOWER('%${reviewName}%')`
        );

        return review; 
    }

    async findAll () {
        const [reviews] = await db.execute(`
            SELECT * FROM reviews
            `
        );

        return reviews;
    }
}

module.exports = ReviewRepository;