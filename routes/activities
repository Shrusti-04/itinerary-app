const express = require('express');
const router = express.Router();
const activitiesCtrl = require('../controllers/activities');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /trips/:id/activities
router.post('/trips/:id/activities', ensureLoggedIn, activitiesCtrl.create);

// DELETE /activities/:id
router.delete('/activities/:id', ensureLoggedIn, activitiesCtrl.delete);


module.exports = router;