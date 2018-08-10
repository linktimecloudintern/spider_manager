const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const articleSchema = new Schema({
	pageURL: String,
	pageTitle: String,
	pageSize: Number,
	updateTime: {type: Date, default: Date.now}
});

const WebsiteSchema   = new Schema({
	siteID: String,
	siteURL: String,
	articles: [articleSchema]
});

module.exports = mongoose.model('Website', WebsiteSchema);
