const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

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

    createAuthToken (user) {
        let generatedToken = jwt.sign(
            { id: user.id },
            TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        return generatedToken;
    }

    validateAuthToken (authorization) {
        const reqToken = authorization.split(" ")[1];
        const decodedToken = jwt.verify(reqToken, TOKEN_SECRET);
        return decodedToken;
    }

    validateEmail (email) {
        const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailCheck.test(email);
    }

    generatePropertyID = (length) => {
        const chars =
          "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
        const randomArray = Array.from(
          { length: length },
          (v, k) => chars[Math.floor(Math.random() * chars.length)]
        );
      
        const propertyID = randomArray.join("");
        return propertyID;
    };

    uploadMiddleware () {
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
              cb(null, './uploads');
            },
            filename: function(req, file, cb){
               const now = new Date().toISOString();
               const date = now.replace(/:/g, '-');
          
                var num = Math.random().toExponential().split('e-');
                var num2 = num[0].split('.');
                var key = num2[1];
                var slug = "upload" + key.slice(0, 12);
          
              cb(null, date + slug + path.extname(file.originalname));
            }
          });
          
          const upload = multer({
            storage: storage,
            limits: {
              fileSize: 1024 * 1024 * 30
            }
          })

        return upload;
    }

    async uploadImage (req) {
        var dir = './uploads/thumbnails';

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
     
        await sharp(req.file.path)
           .resize({width: 500, height: 500})
           .toFile(`./uploads/thumbnails/${req.file.filename}`);
    }

}

module.exports = Utils;