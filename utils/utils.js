const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "the-super-strong-secrect";

class Utils {

    async createHashedPassword (password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    async verifyHashedPassword (password, actualPassword) {
        const isValid = await bcrypt.compare(password, actualPassword);
        return isValid;
    }

    async createAuthToken (user) {
        let generatedToken = jwt.sign(
            { id: user.id },
            TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        return generatedToken;
    }

    async validateAuthToken (authorization) {
        const reqToken = authorization.split(" ")[1];
        const decodedToken = jwt.verify(reqToken, TOKEN_SECRET);
        return decodedToken;
    }

    async validateEmail (email) {
        const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailCheck.test(email);
    }
}

module.exports = Utils;