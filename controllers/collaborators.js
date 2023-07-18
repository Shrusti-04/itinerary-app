const Trip = require('../models/trip');
const User = require('../models/user');

module.exports = {
  create,
};
async function create(req, res) {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      console.log(`No trip found with id: ${req.params.id}`);
      return res.redirect(`/error`); 
    }

    const collabUser = await User.findOne({ email: req.body.email });

    if (!collabUser) {
      console.log(`No user found with email: ${req.body.email}`);
      // redirect to the previous page or the trip's page without adding a collaborator
      return res.redirect(`/trips/${trip._id}`);
    }

    const collaborator = {
      collaborator: collabUser._id,
      userName: collabUser.name,
      userAvatar: collabUser.avatar,
    };

    trip.collaborators.push(collaborator);

    await trip.save();

    res.redirect(`/trips/${trip._id}`);  

  } catch (err) {
    console.log(err);
    res.redirect(`/error`);
  }
}

