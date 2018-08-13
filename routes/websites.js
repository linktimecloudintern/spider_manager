const express = require('express');
const shell = require('../utils/shell');
const axios = require('axios');
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
let Website = require('../data/db/websites');

// create our router
const router = express.Router();

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

// on routes that end in /websites/:siteID
// ----------------------------------------------------
async function crawlWebsite() {
	try {
		const response = await axios.post('/:siteID');
		const {code, stdout, stderr} = await shell('cd ./tutorial && python begin.py');
	} catch (error) {
		console.error(error);
	}
}
router.route('/:siteID')

	// .post(async function(req,res) {
	// 	const {code, stdout, stderr} = await shell('cd ./tutorial && python begin.py');
	// 	// if (shell.exec('cd ./tutorial && python begin.py').code !== 0) {
	// 	// 	shell.echo('Error: run begin.py failed')
	// 	// 	shell.exit(1)
	// 	// }
	// 	res.json({ message: 'Website crawled!' });
	// })

	// crawlWebSite(sessionId, userId, siteId): run the crawler for the web site asynchronously. 
	.get(function(req, res) {
		crawlWebsite();
		res.json({message: 'Website updated!'})
		// Website.findById(req.params.website_id, function(err, website) {
		// 	if (err)
		// 		res.send(err);
		// 	res.json(website.articles);
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


		// crawlWebSite(sessionId, userId, siteId): run the crawler for the web site asynchronously. 
	// .put(function(req, res) {
	// 	Website.findById(req.params.website_id, function(err, website) {

	// 		if (err)
	// 			res.send(err);

	// 		website.articles = req.body.articles;
	// 		website.save(function(err) {
	// 			if (err)
	// 				res.send(err);

	// 			res.json({ message: 'Website updated!' });
	// 		});

	// 	});
	// })


// router.get('/:id', (req, res) => {
//     // id stands for the index of item in the 'websites list'
//     const { id } = req.params;
//     const { articles } = websites[id]; 
//     const numberOfArticles = articles.length;
//     const { siteURL } = websites[id];
//     const { siteID } = websites[id];    
//     const templateData = { articles, numberOfArticles, id, siteURL,siteID};
    
//     res.render('table',templateData);
    
// });

module.exports = router;