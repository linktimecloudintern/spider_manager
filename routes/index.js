const express = require('express');
// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging                 
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:3333)
router.get('/', (req, res) => {
  res.render('start');
});

module.exports = router;
