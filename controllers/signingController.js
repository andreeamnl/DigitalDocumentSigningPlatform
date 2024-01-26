const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AsposePdf = require('../asposepdf/AsposePDFforNode.cjs');
const { Certificate } = require("../models/certificateModel");
const { Signature } = require("../models/signatureModel");
const { Document } = require("../models/documentModel");


router.post('/digital_signature', auth, async (req, res) => {
    const userId = req.currentUser.userId;

    try {
        // Try to find the document in the database by its ID
        const certificate = await Certificate.findOne({ user: userId} );
    
        // Check if the certificate was not found
        if (!certificate) {
            return res.status(404).send('Certificate not found');
        }

        const certificate_path = certificate.path.toString();

        // Try to find the signature in the database by its ID
        const signature = await Signature.findOne({ user: userId} );
    
        // Check if the document was not found
        if (!signature) {
            return res.status(404).send('Signature not found');
        }
        // PDF file to sign
        const pdf_file_name = req.body.pdf_file.toString();
        // Page number
        const page_num = req.body.page_num.toString();
        // Password for the digital password
        const password = req.body.password.toString();
        // setXIndent
        const x_indent = req.body.x_indent.toString();
        // setYIndent
        const y_indent = req.body.y_indent.toString();
        // setHeight
        const height = req.body.height.toString();
        // setWidth
        const width = req.body.width.toString();
        // reason
        // contact
        // location
        // Signature appearance
        const img_file = signature.path.toString();

        await Document.findOneAndUpdate({ user: userId, filename: pdf_file_name }, {status: "in progress"});

        // Input file
        const pdf_file = `.//uploads/${userId}/${pdf_file_name}`;
        // Result file
        const result_file = `.//uploads/${userId}/${pdf_file_name.replace(".pdf", "_signed.pdf")}`;
        // Sign a PDF-file with digital signatures and save the "ResultSignPKCS7.pdf"
        AsposePdf().then(AsposePdfModule => {
            const json = AsposePdfModule.AsposePdfSignPKCS7(pdf_file, 1, certificate_path, password, x_indent, y_indent, height, width, "Reason", "Contact", "Location", 1, img_file, result_file);
            console.log("AsposePdfSignPKCS7 => %O", json.errorCode == 0 ? json.fileNameResult : json.errorText);
            console.log("AsposePdfSignPKCS7 => %O", json.errorCode);
            
        }).then(async() => {
            await Document.findOneAndUpdate({ user: userId, filename: pdf_file_name }, {status: "signed"});
            res.status(200).send("No errors so far =)");
        });

        // if (json.errorCode == 0) {
            
        // } else {
        //     await Document.findOneAndUpdate({ user: userId, filename: pdf_file_name }, {status: "error"});
        // }

        
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occured');
        // await Document.findOneAndUpdate({ user: userId, filename: pdf_file_name }, {status: "error"});
	}
});

module.exports = router;