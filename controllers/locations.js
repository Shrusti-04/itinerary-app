const Trip = require('../models/trip');

module.exports = {
  create,
  delete: deleteLocation,
};

async function deleteLocation(req, res) {
  const trip = await Trip.findOne({ 'locations._id': req.params.id, 'locations.user': req.user._id }); //finds the trip by the location id and the user id

  if (!trip) return res.redirect('/trips'); //if the trip doesn't exist, redirect to the trips index page
  trip.locations.remove(req.params.id); //removes the location from the trip

  await trip.save();
  res.redirect(`/trips/${trip._id}`); //redirects to the trip's show page
}

async function create(req, res) {
  const trip = await Trip.findById(req.params.id); //finds the trip by the id in the url
  
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar; //adds the user's name and avatar to the req.body

  trip.locations.push(req.body); //pushes the req.body into the locations array

  try {
    await trip.save(); //saves the trip
  } catch (err) {
    console.log(err);
  }

  res.redirect(`/trips/${trip._id}`);  //redirects to the trip's show page
}