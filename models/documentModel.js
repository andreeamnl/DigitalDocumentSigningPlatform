const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
	filename: String,
	path: String,
	user: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User', 
	},
	status: String,
});

const Document = mongoose.model('Document', documentSchema);

module.exports = {
	Document,
	documentSchema,
};