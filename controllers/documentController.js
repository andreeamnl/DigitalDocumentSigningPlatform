const express = require("express");
const router = express.Router();
const database = require('../database/db');
const auth = require("../middleware/auth");
const { Document } = require("../models/documentModel");
const { userSchema } = require("../models/userModel");
const { upload } = require("../util/storage")

router.post('/upload', auth, upload.single('document'), async (req, res) => {
	// if no file was uploaded 
    if (!req.file) {
        console.log('No file was uploaded.');
        return res.status(400).send('No file was uploaded.');
    }

	// check the format of the file (JPEG )
    if (req.file.mimetype !== 'application/pdf' && req.file.mimetype !== 'image/jpg') {
        console.log('Allowed only PDF files');
        return res.status(400).send('Allowed only PDF files');
    }

	const userId = req.currentUser.userId;

    // create folder with user id if doesn't exist
    const userFolderPath = path.join(__dirname, '..', 'uploads', userId.toString());
    if (!fs.existsSync(userFolderPath)){
        fs.mkdirSync(userFolderPath);
    }

    //move uploaded certificate to user folder
    const filePath = path.join(userFolderPath, req.file.originalname);
    fs.renameSync(req.file.path, filePath);

	// Create a new document using the Document model
	const document = new Document({
		filename: req.file.originalname,
		path: req.file.path,
		user: user._id,
		status: "ready"
	});

	try {
		// Save the document to the database
		await document.save();
		res.status(200).send('Document uploaded successfully.');
	} catch (error) {
		console.error(error);
		res.status(500).send('Failed to upload the document.');
	}
});

router.get('/download/:documentId', async (req, res) => {
	
	try {
	  // Try to find the document in the database by its ID
	  const document = await Document.findById(req.params.documentId);
  
	  // Check if the document was not found
	  if (!document) {
		return res.status(404).send('Document not found');
	  }
  
	  // Set the appropriate response headers for downloading the file
	  res.setHeader('Content-disposition', 'attachment; filename=' + document.filename);
  
	  // Send the file as a response
	  res.download(document.path, document.filename, (error) => {
		if (error) {
		  console.error(error);
		  res.status(500).send('Failed to download the document');
		} else {
		  console.log('Document downloaded successfully');
		}
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Failed to download the document');
	}
  });
  

router.get("/docs", auth, async (request, response) => {
	const userId = req.currentUser.userId;

	const docs = await Document.find({user: userId});
	try {
		response.send(docs);
	} catch (error) {
		response.status(500).send(error);
	}
})
module.exports = router;
