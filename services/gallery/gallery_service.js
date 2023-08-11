const ErrorHandler = require("../../utils/errorHandler");
const GalleryRepository = require("./gallery_repository");
const PropertyRepository = require("../property/property_repository")
const Utils = require("../../utils/utils");



let errorHandler = new ErrorHandler();
let galleryRepository = new GalleryRepository();
let propertyRepository = new PropertyRepository();


let utils = new Utils();

class GalleryService {

    async addImage (req) {
        //const validateRequest = errorHandler.handleGalleryErrors(req);
        const saveImageToFile = utils.uploadImage(req);

        const image_thumbnail = req.file.filename
        const image_original = req.file.filename
        const property_id = req.params.id

        const dbProperty = await propertyRepository.findById(property_id);

        if (dbProperty.length < 1) {
            throw new Error("property-not-registered");
        }

        const image = await galleryRepository.create(
            image_thumbnail, image_original, property_id
        );

        return image[0];
    }

    async getImages () {
        const images = await galleryRepository.findAll();

        return images;
    }

    async getImageById (req) {
        const image = await galleryRepository.findById(req.params.id);

        return image[0];
    }

    async getImageByName (req) {
        const image = await galleryRepository.findByName(req.body.name);

        if (image.length < 1) {
            throw new Error("image-not-found");
        }

        return image;
    }

    async getImagesByPropertyId (propertyId) {

        const dbProperty = await propertyRepository.findById(propertyId);

        if (dbProperty.length < 1) {
            throw new Error("property-not-found");
        }

        const images = await galleryRepository.findByPropertyId(propertyId);

        return images;
    }

    

}

module.exports = GalleryService;