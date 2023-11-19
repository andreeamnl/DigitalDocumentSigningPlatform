const express = require("express");
const router = express.Router();
const database = require('../database/db');
const { Document } = require("../models/documentModel");
const { userSchema } = require("../models/userModel");
const { upload } = require("../util/storage")

router.get('/upload', (req, res) => {
	res.sendFile(path.join(__dirname, '../view', 'upload.html'));
});

router.post('/upload', upload.single('document'), async (req, res) => {
	// Check if no file was uploaded in the request
	if (!req.file) {
		return res.status(400).send('No file was uploaded.');
	}

	const userModel = database.mongoose.model('User', userSchema);
	const user = await userModel.findOne({ /* specify the user later */ });

	if (!user) {
		return res.status(404).send('User not found.');
	}
	// Create a new document using the Document model
	const document = new Document({
		filename: req.file.originalname,
		path: req.file.path,
		user: user._id,
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
  

router.get("/docs", async (request, response) => {
	const docs = await Document.find({});
	try {
		response.send(docs);
	} catch (error) {
		response.status(500).send(error);
	}
})
module.exports = router;
