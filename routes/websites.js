const express = require('express');
const router = express.Router();
const { data } = require('../data/websitesData.json');
const { websites } = data;

router.route('/')

  /* 
  addWebSite(sessionID, userId, siteUrl): returns a unique siteId for the siteUrl
  If the siteUrl already exists, return the corresponding instance.
  (accessed at POST http://localhost:3333/websites)
  */
    // .get('/', (req, res) => {

    // res.render('table');
    
    // })

	.post(async function(req, res) {
		
		let website = new Website();		// create a new instance of the Website model
		website.siteURL = req.body.siteURL;  // set the website's URL (comes from the request)

		website.save(function(err) {
			if (err)
				res.send(err);
			res.json(req.body);
        });
        next();
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
router.route('/:siteID')

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