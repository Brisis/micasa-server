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

    async deleteSingle (req) {
        const {galleryId, propertyId} = req.params;
        
        const dbImage = await galleryRepository.findById(galleryId);

        if (dbImage.length < 1) {
            throw new Error("image-not-registered");
        }

        const dbProperty = await propertyRepository.findById(propertyId);

        if (dbProperty.length < 1) {
            throw new Error("property-not-registered");
        }

        let imageUrl = dbImage[0].image_thumbnail;

        if (dbProperty[0].cover_image == imageUrl) {
            throw new Error("cannot-delete-cover-image");
        }

        await galleryRepository.delete(galleryId);

        await utils.deleteFile(imageUrl);

        return {message: "File is deleted."}
    }

    async deleteBulk (req) {
        const {propertyId} = req.params;
        
        const dbProperty = await propertyRepository.findById(propertyId);

        if (dbProperty.length < 1) {
            throw new Error("property-not-registered");
        }

        await propertyRepository.updateCoverImage(dbProperty[0].id, null);

        const images = await galleryRepository.findByPropertyId(propertyId);

        if (images.length < 1) {
            throw new Error("images-not-found");
        }

        for (let i = 0; i < images.length; i++) {
            const image = images[i];

            let imageUrl = image.image_thumbnail;
    
            await galleryRepository.delete(image.id);
    
            await utils.deleteFile(imageUrl);
            
        }

        return {message: "Files deleted."}
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