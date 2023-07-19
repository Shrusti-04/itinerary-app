const Trip = require('../models/trip');

module.exports = {
  create,
  delete: deleteActivity,
};


async function deleteActivity(req, res) {
  const trip = await Trip.findOne({ 'activities._id': req.params.id, 'activities.user': req.user._id }); //finds the trip by the activity id and the user id

  if (!trip) return res.redirect('/trips'); //if the trip doesn't exist, redirect to the trips index page
  trip.activities.remove(req.params.id); //removes the activity from the trip

  await trip.save();
  res.redirect(`/trips/${trip._id}`); //redirects to the trip's show page
}

async function create(req, res) {
  const trip = await Trip.findById(req.params.id); //finds the trip by the id in the url


  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar; //adds the user's name and avatar to the req.body

  trip.activities.push(req.body); //pushes the req.body into the activities array
  
  try {
    await trip.save(); //saves the trip
  } catch (err) {
    console.log(err);
  }

  res.redirect(`/trips/${trip._id}`);  //redirects to the trip's show page
}