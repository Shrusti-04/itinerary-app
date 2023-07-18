const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  itinerary: {
    type: Array,
  }
});

const collaboratorSchema = new Schema({
  collaborator: String,
  userName: String,
  userAvatar: String,
});

const locationSchema = new Schema({
  location: String,
  date: Date, //optional
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String,
});

const activitySchema = new Schema({
  activity: String,
  location: String, //optional`
  date: Date, //optional
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String,
});

const tripSchema = new Schema({
  name: { 
    type: String,
    required: true,
  },
  destination: { 
    type: String,
    required: true,
  },
  startDate: { 
    type: Date,
    required: true,
  },
  endDate:{ 
    type: Date,
    required: true,
  },
  duration: Number,
  budget: {
    type: Number,
    default: 0,
  },
  currency: { 
    type: String,
    default: 'USD - $',
  },
  activities: [activitySchema],
  locations: [locationSchema],
  itinerary: {
    type: [itinerarySchema],
    default: [{
      itinerary: 'You have no itinerary yet.',
    }]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref : 'User',
    required: true,
  },
  collaborators: [collaboratorSchema],
}, {
    timestamps: true
  });

  module.exports = mongoose.model('Trip', tripSchema);