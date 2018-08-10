const express = require('express');

// DATABASE SETUP
var mongoose   = require('mongoose');
mongoose.connect("mongodb://localhost:27017/websites"); // connect to a database named websites

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// Website models lives here
let Website = require('../data/db/website');

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging                 
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:3333)
router.get('/', function(req, res) {
	res.render('start');	
});

router.get('/', (req, res) => {
  res.render('start');
});

// on routes that end in /websites
// ----------------------------------------------------
router.route('/websites')

  /* 
  addWebSite(sessionID, userId, siteUrl): returns a unique siteId for the siteUrl
  If the siteUrl already exists, return the corresponding instance.
  (accessed at POST http://localhost:3333/websites)
  */

	.post(async function(req, res) {
		
		let website = new Website();		// create a new instance of the Website model
		website.siteURL = req.body.siteURL;  // set the website's URL (comes from the request)
		website.save(function(err) {
			if (err)
				res.send(err);
			res.json(req.body);
		});
	})

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
	});

// on routes that end in /websites/:website_id
// ----------------------------------------------------
router.route('/websites/:siteID')

	// crawlWebSite(sessionId, userId, siteId): run the crawler for the web site asynchronously. 
	.get(function(req, res) {
		Website.findById(req.params.website_id, function(err, website) {
			if (err)
				res.send(err);
			res.json(website.articles);
		});
	})

	// crawlWebSite(sessionId, userId, siteId): run the crawler for the web site asynchronously. 
	.put(function(req, res) {
		Website.findById(req.params.website_id, function(err, website) {

			if (err)
				res.send(err);

			website.articles = req.body.articles;
			website.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Website updated!' });
			});

		});
	})

	// removeWebSite(sessionId, userId, siteId): remove the site identified by the siteId. 
	.delete(function(req, res) {
		Website.remove({
			_id: req.params.siteID
		}, function(err, website) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
  });
  

module.exports = router;
