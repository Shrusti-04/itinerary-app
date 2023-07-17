const express = require('express');
const router = express.Router();
const itinerariesCtrl = require('../controllers/itineraries');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /trips/:id/itineraries
router.post('/trips/:id/itineraries', ensureLoggedIn, itinerariesCtrl.create);

// DELETE /itineraries/:id
router.delete('/itineraries/:id', ensureLoggedIn, itinerariesCtrl.delete);


module.exports = router;