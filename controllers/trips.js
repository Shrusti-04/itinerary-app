const Trip = require('../models/trip');

module.exports = {
  index,
  new: newTrip,
  create,
  show,
  delete: deleteTrip,
  updateBudget,
  updateDate,
  updateDestination,
  updateName
};

async function updateBudget(req, res) {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip.user.equals(req.user._id) || trip.collaborators.some(collaborator => collaborator.collaborator === req.user._id.toString())) {
      trip.budget = req.body.budget;
      trip.currency = req.body.currency;
      await trip.save();
    }
    res.redirect(`/trips/${trip._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/trips');
  }
}

async function updateDate(req, res) {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip.user.equals(req.user._id) || trip.collaborators.some(collaborator => collaborator.collaborator === req.user._id.toString())) {
      // Append the 'T00:00' before assigning the values to the trip
      req.body.startDate += 'T00:00';
      req.body.endDate += 'T00:00';

      trip.startDate = new Date(req.body.startDate);
      trip.endDate = new Date(req.body.endDate);

      let durationTime = Math.abs(trip.endDate - trip.startDate);
      trip.duration = Math.ceil(durationTime / (1000 * 60 * 60 * 24)) + 1; 

      await trip.save();
    }
    res.redirect(`/trips/${trip._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/trips');
  }
}


async function updateDestination(req, res) {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip.user.equals(req.user._id) || trip.collaborators.some(collaborator => collaborator.collaborator === req.user._id.toString())) {
      trip.destination = req.body.destination;
      await trip.save();
    }
    res.redirect(`/trips/${trip._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/trips');
  }
}

async function updateName(req, res) {
  try {
    const trip = await Trip.findById(req.params.id);
    if (trip.user.equals(req.user._id) || trip.collaborators.some(collaborator => collaborator.collaborator === req.user._id.toString())) {
      trip.name = req.body.name;
      await trip.save();
    }
    res.redirect(`/trips/${trip._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/trips');
  }
}

async function index(req, res) {
  const trips = await Trip.find({ user: req.user._id });
  const collabTrips = await Trip.find({ 'collaborators.collaborator': req.user._id.toString() });
  
  res.render('trips/index', { title: 'My Trips', trips, collabTrips });
}


async function show(req, res) {
  try {
    console.log(req.query);
    console.log(req.query.email);
    const trip = await Trip.findById(req.params.id);
    if (trip.user.equals(req.user._id) || trip.collaborators.some(collaborator => collaborator.collaborator === req.user._id.toString())) {
      res.render('trips/show', { title: `${trip.name}`, trip });
    } else {
      req.flash('error', 'You do not have permission to view this trip');
      res.redirect(`/trips`);
    }
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

  req.body.userAvatar = req.user.avatar;
  req.body.user = req.user._id;
  let start = new Date(req.body.startDate);
  let end = new Date(req.body.endDate);
  let durationTime = Math.abs(end - start);
  req.body.duration = Math.ceil(durationTime / (1000 * 60 * 60 * 24)) + 1; 

  //Fixing the time issue:
  req.body.startDate += 'T00:00';
  req.body.endDate += 'T00:00';

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