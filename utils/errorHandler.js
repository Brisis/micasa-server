const Utils = require("./utils");

let utils = new Utils();

class ErrorHandler {

    handleAuthErrors (req) {
        const {email, password} = req.body;
        let errors = [];

        if (!email) {
            errors.push("Email field is required");
        }

        if (email) {
            if(!utils.validateEmail(email)){
                errors.push("Email not valid");
            }
        }

        if (!password) {
            errors.push("Password field is required");
        }

        if (password) {
            if (password.length < 6) {
                errors.push("Password less than 6 characters"); 
            }
        }

        if (errors.length > 0) {
            throw new Error(errors);
        }

    }

    handleLocationErrors (req) {
        const {name, map_coordinates} = req.body;
        let errors = [];

        if (!name) {
            errors.push("Location name is required");
        }

        if (map_coordinates) {
            if (map_coordinates.length < 6) {
                errors.push("Invalid map coordinates"); 
            }
        }

        if (errors.length > 0) {
            throw new Error(errors);
        }

    }
}

module.exports = ErrorHandler;