const OPENAI_API_KEY = "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";

const Trip = require('../models/trip');

module.exports = {
  create,
  delete: deleteItinerary,
};


async function deleteItinerary(req, res) {
  const trip = await Trip.findOne({ 'itineraries._id': req.params.id, 'itineraries.user': req.user._id }); //finds the trip by the activity id and the user id

  if (!trip) return res.redirect('/trips'); //if the trip doesn't exist, redirect to the trips index page
  trip.itineraries.remove(req.params.id); //removes the activity from the trip

  await trip.save();
  res.redirect(`/trips/${trip._id}`); //redirects to the trip's show page
}

async function fetchData(prompt) {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
    }),
  })
  const data = await response.json()
  console.log(data);
  return data.choices[0].text;
}

async function create(req, res) {
  const trip = await Trip.findById(req.params.id); //finds the trip by the id in the url

  let tripPrompt = `Give me a detailed daily itinerary in one string, in a bullet point list, where each day is a bullet (e.g. "Day 1: "), for a vacation to ${trip.location} from ${trip.startDate} until ${trip.endDate}, including the actitivities ${trip.activities} and visting the locations ${trip.locations} within their budget of ${trip.currency} ${trip.budget}, suggest good restaurants and other things that are fun in that area.`;

  req.body.itinerary = await fetchData(tripPrompt);  // await the result of fetchData()
  //let itineraryOutput = document.getElementById('itineraryOutput');
  //itineraryOutput.innerHTML = await fetchData(tripPrompt);

  console.log(trip.itinerary);
  trip.itinerary.push(req.body); // Add AI output into the itinerary array

  try {
    await trip.save(); //saves the trip
  } catch (err) {
    console.log(err);
  }



  res.redirect(`/trips/${trip._id}`);  //redirects to the trip's show page
}
