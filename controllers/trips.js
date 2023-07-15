const Trip = require('../models/trip');

module.exports = {
  index,
  new: newTrip,
  create,
  show,
  delete: deleteTrip,
};

async function index(req, res) {
  const trips = await Trip.find({ user: req.user._id });
  res.render('trips/index', { title: 'My Trips', trips });
}

async function show(req, res) {
  try {
  const trip = await Trip.findById(req.params.id);
  res.render('trips/show', { title: `${trip.name}`, trip });
  } catch (err) {
    console.log(err);
    res.redirect('/trips');
  }
}


function newTrip(req, res) {
  res.render('trips/new', { title: 'New Trip', errorMsg: '' });
}


async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }

  req.body.user = req.user._id;

  try {
    const trip = await Trip.create(req.body);
    res.redirect(`/trips/${trip._id}`);
  } catch (err) {
    console.log(err);
    res.render('/trips/new', { errorMsg: err.message });
  }
}

async function deleteTrip(req, res) {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.redirect('/trips');
  } catch (err) {
    console.log(err);
    res.redirect('/trips');
  }
}