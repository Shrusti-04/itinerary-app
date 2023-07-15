const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  name: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
  activities: [activitySchema],
  locations: [locationSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref : 'User',
    required: true,
  },
}, {
    timestamps: true
  });

  module.exports = mongoose.model('Trip', tripSchema);