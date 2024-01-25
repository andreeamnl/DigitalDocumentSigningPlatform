const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
	filename: String,
	path: String,
	user: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User', 
	},   
});

const Signature = mongoose.model('Signature', signatureSchema);

module.exports = {
	Signature,
	signatureSchema,
};