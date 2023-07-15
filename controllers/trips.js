const Trip = require('../models/trip');

module.exports = {
  index,
  new: newTrip,
};

async function index(req, res) {
  const trips = await Trip.findById(req.user._id).populate('trips'); // Doublecheck this!!! 
  res.render('trips/index', { title: 'My Trips', trips });
}

function newTrip(req, res) {
  res.render('trips/new', { title: 'New Trip', errorMsg: '' });
}