const fs = require("fs");
const path = require("path");

const remove = async (fileName) => {
  const directoryPath = path.join(__dirname, './uploads/');
  const directoryThumbnailsPath = path.join(__dirname, './uploads/thumbnails/');

  await fs.unlink(path.join(directoryPath, fileName))     
  await fs.unlink(path.join(directoryThumbnailsPath, fileName))    
  console.log('Deleted')

};


module.exports = {remove};