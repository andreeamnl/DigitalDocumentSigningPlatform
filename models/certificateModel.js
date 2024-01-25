const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
	filename: String,
	path: String,
	user: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User',
	},   
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = {
	Certificate,
	certificateSchema,
};