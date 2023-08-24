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

    handlePropertyErrors (req) {
        const {
            locationId,
            name,
            category,
            price,
            status,
            purpose
        } = req.body;

        let errors = [];

        if (!locationId) {
            errors.push("Location ID is required");
        }

        if (!name) {
            errors.push("Name is required");
        }

        if (!category) {
            errors.push("Category is required");
        }

        if (!price) {
            errors.push("Price is required");
        }

        if (!status) {
            errors.push("Status is required");
        }

         if (!purpose) {
            errors.push("Purpose is required");
        }

        if (errors.length > 0) {
            throw new Error(errors);
        }

    }

    handleLeaseErrors (req) {
        const {
            userId,
            nationalId,
            dateOfBirth,
            occupation,
            periodEmployedInMonths,
            employerName,
            salary,
            businessAddress,
            phoneNumber,
            currentHomeAddress,
             familySize,
            nextOfKin,
            nextOfKinPhoneNumber,
            nextOfKinAddress,
            signature
        } = req.body;

        let errors = [];

        if (!userId) {
            errors.push("User ID is required");
        }

        if (!nationalId) {
            errors.push("nationalId is required");
        }

        if (!dateOfBirth) {
            errors.push("dateOfBirth is required");
        }

        if (!occupation) {
            errors.push("occupation is required");
        }

        if (!periodEmployedInMonths) {
            errors.push("periodEmployedInMonths is required");
        }

        if (!employerName) {
            errors.push("employerName is required");
        }

        if (!salary) {
            errors.push("salary is required");
        }

        if (!businessAddress) {
            errors.push("businessAddress is required");
        }

        if (!phoneNumber) {
            errors.push("phoneNumber is required");
        }

        if (!currentHomeAddress) {
            errors.push("currentHomeAddress is required");
        }
  

        if (!familySize) {
            errors.push("familySize is required");
        }

        if (!nextOfKin) {
            errors.push("nextOfKin is required");
        }

        if (!nextOfKinAddress) {
            errors.push("nextOfKinAddress is required");
        }

        if (!nextOfKinPhoneNumber) {
            errors.push("nextOfKinPhoneNumber is required");
        }

        if (!signature) {
            errors.push("signature is required");
        }

        if (errors.length > 0) {
            throw new Error(errors);
        }

    }

    handleLeaseUpdateErrors (req) {
        const {
            occupation,
            periodEmployedInMonths,
            employerName,
            salary,
            businessAddress,
            currentHomeAddress,
             familySize,
            nextOfKin,
            nextOfKinPhoneNumber,
            nextOfKinAddress,
        } = req.body;

        let errors = [];

        if (!occupation) {
            errors.push("occupation is required");
        }

        if (!periodEmployedInMonths) {
            errors.push("periodEmployedInMonths is required");
        }

        if (!employerName) {
            errors.push("employerName is required");
        }

        if (!salary) {
            errors.push("salary is required");
        }

        if (!businessAddress) {
            errors.push("businessAddress is required");
        }

        if (!currentHomeAddress) {
            errors.push("currentHomeAddress is required");
        }
 
        if (!familySize) {
            errors.push("familySize is required");
        }

        if (!nextOfKin) {
            errors.push("nextOfKin is required");
        }

        if (!nextOfKinAddress) {
            errors.push("nextOfKinAddress is required");
        }

        if (!nextOfKinPhoneNumber) {
            errors.push("nextOfKinPhoneNumber is required");
        }

        if (errors.length > 0) {
            throw new Error(errors);
        }

    }
}

module.exports = ErrorHandler;