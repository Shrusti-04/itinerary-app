const express = require('express');
const router = express.Router();
const locationsCtrl = require('../controllers/locations');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /trips/:id/locations
router.post('/trips/:id/locations', ensureLoggedIn, locationsCtrl.create);

// DELETE /locations/:id
router.delete('/locations/:id', ensureLoggedIn, locationsCtrl.delete);


module.exports = router;