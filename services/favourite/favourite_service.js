const ErrorHandler = require("../../utils/errorHandler");
const FavouriteRepository = require("./favourite_repository");
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let favouriteRepository = new FavouriteRepository();
let utils = new Utils();

class FavouriteService {

    async registerFavourite (req) {
        const validateRequest = errorHandler.handleFavouriteErrors(req);

        const {country, city, name, map_coordinates} = req.body;

        const dbFavourite = await favouriteRepository.findByName(name);

        if (dbFavourite.length > 0) {
            throw new Error("favourite-already-registered");
        }

        const favourite = await favouriteRepository.create(
            country,
            city,
            name, 
            map_coordinates == undefined ? null : map_coordinates
        );

        return favourite[0];
    }

    async getFavourites () {
        const favourites = await favouriteRepository.findAll();

        return favourites;
    }

    async getFavouriteById (req) {
        const favourite = await favouriteRepository.findById(req.params.id);

        return favourite[0];
    }

    async getFavouriteByName (req) {
        const favourite = await favouriteRepository.findByName(req.body.name);

        if (favourite.length < 1) {
            throw new Error("favourite-not-found");
        }

        return favourite;
    }

}

module.exports = FavouriteService;