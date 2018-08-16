const express = require('express');
const shell = require('../utils/shell');
const fs = require('fs');

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect("mongodb://localhost:27017/websites"); // connect to a database named websites

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});
// clear db when loading the website
// db.dropDatabase();
// Website models lives here
let Website = require('../data/db/websites');

// create our router
const router = express.Router();

// router.route('/table')

// 	.get(function(req, res) {
// 		res.render('table');
// 	});
	
router.route('/')

	/*  
  getWebSiteList(sessionId, userId): returns all web sites for the specified user as a json object array, 
  each item is a tuple (siteId: ID, siteUrl: URL).  
  (accessed at GET http://localhost:3333/websites)
  */
	.get(function(req, res) {
		Website.find(function(err, websites) {
			if (err)
				res.send(err);
			// res.render('table');
			res.json(websites);
		});
	})

	/* 
  addWebSite(sessionID, userId, siteUrl): returns a unique siteId for the siteUrl
  If the siteUrl already exists, return the corresponding instance.
  (accessed at POST http://localhost:3333/websites)
  */
	.post(function(req, res) {
			
		let website = new Website();		// create a new instance of the Website model
		website.siteURL = req.body.siteURL;  // set the website's URL (comes from the request)
		website.save(function(err) {
			if (err)
				res.send(err);
			res.json(website);
		});
	});


// ----------------------------------------------------
router.route('/site/:url')

  // crawlWebSite(sessionId, userId, siteId): run the crawler for the web site asynchronously. 
	.post(async function(req, res) {
		let response = await shell('cd ./tutorial && rm -r items.json && python begin.py');
		if (response && response.code === 0) {
			const article = require('../tutorial/items.json');
			const resultData = { article };
			res.send(resultData);
		} else {
			res.send(response);
		}		
	})
	// .get(function(req, res) {
	// 	return res.render('table');
	// })

	// removeWebSite(sessionId, userId, siteId): remove the site identified by the siteId. 
	.delete(async function(req, res) {

		Website.remove({
			siteURL: decodeURIComponent(req.params.url)
		}, function(err, website) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;