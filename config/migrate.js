const fs = require("fs");
const path = require("path");
const db = require("../config/db");

// read sql files
const dirname = path.join(__dirname, '../schemas/');

const billingSql = fs.readFileSync(dirname + 'billing.sql').toString();
const favouriteSql = fs.readFileSync(dirname + 'favourite.sql').toString();
const gallerySql = fs.readFileSync(dirname + 'gallery.sql').toString();
const historySql = fs.readFileSync(dirname + 'history.sql').toString();
const leaseSql = fs.readFileSync(dirname + 'lease.sql').toString();
const locationSql = fs.readFileSync(dirname + 'location.sql').toString();
const propertySql = fs.readFileSync(dirname + 'property.sql').toString();
const rentalSql = fs.readFileSync(dirname + 'rental.sql').toString();
const reviewSql = fs.readFileSync(dirname + 'review.sql').toString();
const reserveSql = fs.readFileSync(dirname + 'reserve.sql').toString();
const userSql = fs.readFileSync(dirname + 'user.sql').toString();

const sqlFiles = [
    locationSql,
    userSql,
    leaseSql,
    billingSql,
    propertySql,
    gallerySql,
    favouriteSql,
    historySql,
    rentalSql,
    reviewSql,
    reserveSql,
];

async function doMigration(file) {
    const query = await db.query(file);
    console.log("Migration run successfully");
    return query;
}

(async function() {
    for await (const file of sqlFiles) {
        await doMigration(file)
    }
    console.log("Migrations Complete!");
})();