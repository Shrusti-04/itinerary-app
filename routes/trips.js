const express = require('express');
const router = express.Router();

const tripsCtrl = require('../controllers/trips');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /trips
router.get('/', ensureLoggedIn, tripsCtrl.index);
// GET /trips/new
router.get('/new', ensureLoggedIn, tripsCtrl.new);
// GET /trips/:id
router.get('/:id', ensureLoggedIn, tripsCtrl.show);
// POST /trips
router.post('/', ensureLoggedIn, tripsCtrl.create);

// PUT /trips/:id/date
router.put('/:id/date', ensureLoggedIn, tripsCtrl.updateDate);
// PUT /trips/:id/destination
router.put('/:id/destination', ensureLoggedIn, tripsCtrl.updateDestination);
// PUT /trips/:id/name
router.put('/:id/name', ensureLoggedIn, tripsCtrl.updateName);

// PUT /trips/:id/budget
router.put('/:id/budget', ensureLoggedIn, tripsCtrl.updateBudget);
// DELETE /trips/:id
router.delete('/:id', ensureLoggedIn, tripsCtrl.delete);

module.exports = router;