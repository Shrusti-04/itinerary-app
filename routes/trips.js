const express = require('express');
const router = express.Router();

const tripsCtrl = require('../controllers/trips');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /trips
router.get('/', tripsCtrl.index);
// GET /trips/new
router.get('/new', ensureLoggedIn, tripsCtrl.new);
// GET /trips/:id
router.get('/:id', tripsCtrl.show);
// POST /trips
router.post('/', ensureLoggedIn, tripsCtrl.create);
// DELETE /trips/:id
router.delete('/:id', ensureLoggedIn, tripsCtrl.delete);




module.exports = router;