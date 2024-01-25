const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require('fs');
const auth = require("../middleware/auth");
const { Document } = require("../models/documentModel");
const { Certificate } = require("../models/certificateModel");
const { Signature } = require("../models/signatureModel");
const { upload } = require("../util/storage");


router.post('/signature', auth, upload.single('file'), async (req, res) => {
    // if no file was uploaded 
     if (!req.file) {
         return res.status(400).send('No file was uploaded.');
     }
 
      // check the format of the file (JPEG )
     if (req.file.mimetype !== 'image/jpeg' || req.file.mimetype !== 'image/jpg') {
         return res.status(400).send('Allowed only JPG/JPEG signatures');
     }
 
    const userId = req.currentUser.userId;
     
    // create folder with user id if doesn't exist
    const userFolderPath = path.join(__dirname, '..', 'uploads', userId.toString());
    if (!fs.existsSync(userFolderPath)){
        fs.mkdirSync(userFolderPath);
    }

    //move uploaded signature to user folder
    const filePath = path.join(userFolderPath, req.file.originalname);
    fs.renameSync(req.file.path, filePath);

    // Create a new signature using the Signature model
    const signature = new Signature({
        filename: req.file.originalname,
        path: filePath, 
        user: userId,
    });

    try {
        await signature.save();
        res.status(200).send('Signature uploaded successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to upload the signature.');
    }
 });

 router.get('/certificate', auth, async (req, res) => {
    const userId = req.currentUser.userId;

    try {
        //find any certificate in the database for the current user
        const certificates = await Certificate.find({ user: userId });
    
        // Check if no certificates were found
        if (certificates.length === 0) {
            return res.status(404).send('No certificates found ');
        }
    
        return res.status(200).send('Certificate is available');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve certificates');
    }
});

router.post('/certificate', auth, upload.single('file'), async (req, res) => {
   // if no file was uploaded 
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

     // check the format of the file (pfx )
    if (req.file.mimetype !== 'application/x-pkcs12') {
        return res.status(400).send('Allowed only PFX certificates');
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

    // Create a new certificate using the Certificate model
    const certificate = new Certificate({
        filename: req.file.originalname,
        path: filePath, 
        user: userId,
    });

    try {
        await certificate.save();
        res.status(200).send('Certificate uploaded successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to upload the certificate.');
    }
});

//get the certificates
router.get("/cert", async (request, response) => {
	const cert = await Certificate.find({});
	try {
		response.send(cert);
	} catch (error) {
		response.status(500).send(error);
	}
})
module.exports = router;
