const ErrorHandler = require("../../utils/errorHandler");
const PropertyRepository = require("./property_repository");
const LocationRepository = require("../location/location_repository");
const GalleryRepository = require("../gallery/gallery_repository");
const Utils = require("../../utils/utils");


let errorHandler = new ErrorHandler();

let propertyRepository = new PropertyRepository();
let locationRepository = new LocationRepository();
let galleryRepository = new GalleryRepository();

let utils = new Utils();

class PropertyService {

    async registerProperty (req) {
        const validateRequest = errorHandler.handlePropertyErrors(req);

        const {
            locationId,
            name,
            description,
            amenities,
            category,
            price,
            status,
            purpose
        } = req.body;

        let propertyID = utils.generatePropertyID(10).toUpperCase();

        const dbProperty = await propertyRepository.findByPropertyId(propertyID);

        if (dbProperty.length > 0) {
            throw new Error("property-already-registered");
        }

        const dbLocation = await locationRepository.findById(locationId);

        if (dbLocation.length < 1) {
            throw new Error("location-not-found");
        }

        let location_name = `${dbLocation[0].name}, ${dbLocation[0].city}`;

        const property = await propertyRepository.createProperty(
            name,
            propertyID,
            locationId,
            location_name,
            description == undefined ? `${category} for ${purpose} in ${dbLocation[0].name}` : description,
            amenities == undefined ? null : amenities,
            category,
            price,
            status,
            purpose
        );

        return property[0];
    }

    async setCoverImage (propertyId, imageId) {
        if (propertyId == undefined || imageId == undefined) {
            throw new Error("Params required")
        }

        const dbProperty = await propertyRepository.findById(propertyId);

        if (dbProperty.length < 1) {
            throw new Error("property-not-found");
        }

        const dbImage = await galleryRepository.findById(imageId);

        if (dbImage.length < 1) {
            throw new Error("image-not-found");
        }

        const imageUrl = dbImage[0].image_original;
        const result = propertyRepository.updateCoverImage(propertyId, imageUrl);

        return result;
    }

    async getProperties () {
        const properties = await propertyRepository.findAll();

        return properties.reverse();
    }

    async getPropertyById (req) {
        const property = await propertyRepository.findById(req.params.id);

        return property[0];
    }

    async getPropertyByName (req) {
        const property = await propertyRepository.findByName(req.body.name);

        if (property.length < 1) {
            throw new Error("property-not-found");
        }

        return property;
    }
    
}

module.exports = PropertyService;