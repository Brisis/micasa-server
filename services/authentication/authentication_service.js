const ErrorHandler = require("../../utils/errorHandler");
const AuthenticationRepository = require("./authentication_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let authRepository = new AuthenticationRepository();
let utils = new Utils();

// business logic here
class AuthenticationService {

    async registerUser(req) {
        const validateRequest = errorHandler.handleAuthErrors(req);

        const { email, password } = req.body;

        const dbUser = await authRepository.getUserByEmail(email);

        if (dbUser.length > 0) {
            throw new Error("email-already-in-use");
        }

        const hashedPassword = await utils.createHashedPassword(password);

        const user = await authRepository.createUser(email, hashedPassword)

        return {
            message: "created", 
            user : user[0]
        };
    }

    async login(req) {
        const valid = errorHandler.handleAuthErrors(req);

        const { email, password } = req.body;

        const dbUser = await authRepository.getUserByEmail(email);

        if (dbUser.length < 1) {
            throw new Error("incorrect-email-or-password");
        }

        const verifyHashedPassword = await utils.verifyHashedPassword(password, dbUser[0].password);

        if (!verifyHashedPassword) {
            throw new Error("incorrect-email-or-password");
        }

        const token = utils.createAuthToken(dbUser[0])

        return {
            message: "logged in",
            token: token,
            user: dbUser[0]
        };
    }

    async authenticate(req) {
        const reqToken = req.headers.authorization

        if (
            !reqToken ||
            !reqToken.startsWith("Bearer") ||
            !reqToken.split(" ")[1]
          ) {
            throw new Error("Please provide the token");
        }


        const idFromAuthToken = utils.validateAuthToken(reqToken);

        const dbUser = await authRepository.getUserById(idFromAuthToken.id);

        if (dbUser.length < 1) {
            throw new Error("incorrect-email-or-password");
        }

        // const token = await utils.createAuthToken(dbUser[0].id)

        return {
            message: "authenticated",
            user: dbUser[0]
        };
    }

}

module.exports = AuthenticationService;