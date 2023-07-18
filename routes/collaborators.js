const express = require('express');
const router = express.Router();
const collaboratorsCtrl = require('../controllers/collaborators');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /trips/:id/activities
router.post('/trips/:id/collaborators', ensureLoggedIn, collaboratorsCtrl.create);

// DELETE /activities/:id
//router.delete('/activities/:id', ensureLoggedIn, activitiesCtrl.delete);


module.exports = router;
