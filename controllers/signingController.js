const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AsposePdf = require('../asposepdf/AsposePDFforNode.cjs');

router.post('/sign', auth, async (req, res) => {
    try {
        AsposePdf().then(AsposePdfModule => {
            const prefix = './/uploads/'
            const pdf_file = prefix + 'blank.pdf';
            /*Key PKCS7*/
            const test_pfx_file = prefix + 'dima.pfx';
            /*Signature appearance*/
            const sign_img_file = prefix + 'doggo.jpg';
            /* Result file */
            const result_file = prefix + "ResultFile.pdf";
            /*Sign a PDF-file with digital signatures and save the "ResultSignPKCS7.pdf"*/
            const json = AsposePdfModule.AsposePdfSignPKCS7(pdf_file, 1, test_pfx_file, "mypass", 100, 100, 200, 100, "Reason", "Contact", "Location", 1, sign_img_file, result_file);
            console.log("AsposePdfSignPKCS7 => %O", json.errorCode == 0 ? json.fileNameResult : json.errorText);
            console.log("AsposePdfSignPKCS7 => %O", json.errorCode);

            
        });

        res.status(200).send("No errors so far =)");
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occured');
	}
});

module.exports = router;
