const multer = require('multer');

// Define the storage configuration for multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  // The destination function determines where uploaded files will be stored
	  cb(null, 'uploads/'); // 'uploads/' is the directory where files will be stored
	},
	filename: function (req, file, cb) {
	  // The filename function determines how the uploaded files will be named
	  cb(null, file.originalname); // Use the original filename for the stored file
	},
});
  
// Create a multer instance with the defined storage configuration
const upload = multer({ storage: storage });

module.exports = {
	storage,
	upload,
}