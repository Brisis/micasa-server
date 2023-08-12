const ErrorHandler = require("../../utils/errorHandler");
const FavouriteRepository = require("./favourite_repository");
const UserRepository = require("../user/user_repository");
const PropertyRepository = require("../property/property_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let favouriteRepository = new FavouriteRepository();
let userRepository = new UserRepository();
let propertyRepository = new PropertyRepository();
let utils = new Utils();

class FavouriteService {

    async registerFavourite (req) {
        const {userId, propertyId} = req.params;

        const dbFavourite = await favouriteRepository.findByUserAndProperty(userId, propertyId);

        if (dbFavourite.length > 0) {
            await favouriteRepository.delete(userId, propertyId);

            return {message: "deleted"};
        }

        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const dbProperty = await propertyRepository.findById(propertyId);

        if (dbProperty.length < 1) {
            throw new Error("property-not-found");
        }

        await favouriteRepository.create(
            userId,
            propertyId
        );

        return {message: "favourited"};
    }

    async getFavourites () {
        const favourites = await favouriteRepository.findAll();

        return favourites;
    }

    async getFavouriteById (req) {
        const favourite = await favouriteRepository.findById(req.params.id);

        return favourite[0];
    }

    async getFavouritesByUser (userId) {
        const dbUser = await userRepository.findById(userId);

        if (dbUser.length < 1) {
            throw new Error("user-not-found");
        }

        const favourites = await favouriteRepository.findByUserId(userId);

        let userFavourites = [];
        favourites.forEach((fav) => userFavourites.push(fav.property_id));

        let favouritedProperties = [];
        for (let i = 0; i < userFavourites.length; i++) {
            const dbProperty = await propertyRepository.findById(userFavourites[i]);
            favouritedProperties.push(dbProperty[0]);
        }


        return favouritedProperties;
    }

}

module.exports = FavouriteService;