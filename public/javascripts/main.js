// const OPENAI_API_KEY = "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";



// async function fetchData() {
//   const response = await fetch("https://api.openai.com/v1/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "text-davinci-003",
//       prompt: 'Give me a 7 day Itinerary for a road trip to Sedona, Phoenix, LA, San Diego and San Francisco, including cycling, an outdoor concert, hiking and all other cool places to stop along the route. Format in html list, formatting each list item like so <li class ="list-group-item list-group-item-action col-sm-12 col-md-10 col-lg-8 p-2 list-group-item-light mb-1"></li>. Plus format the day and number in strong tags.',
//       max_tokens: 1000,
//     }),
//   })
//   const data = await response.json()
//   console.log(data.choices[0].text);
//   return data.choices[0].text;
// }

// async function displayData() {
//   let data = await fetchData();
//   let itineraryOutput = document.getElementById('itineraryOutput');
//   itineraryOutput.innerHTML = data;
// }



document.addEventListener("DOMContentLoaded", function() {
  var tripId = document.getElementById('tripId').value;
  var input = document.getElementById('daterange');

  var dateRange = input.value.split(' - ');
  var startDate = new Date(dateRange[0]);
  var endDate = new Date(dateRange[1]);
  
  var picker = flatpickr(input, {
    mode: "range",
    defaultDate: [startDate, endDate],
    onClose: function(selectedDates, dateStr) {
      var dates = dateStr.split(' to ');

      fetch(`/trips/${tripId}/date`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: dates[0],
          endDate: dates[1]
        }),
      })
      .then(response => response.json())
      .then(data => {
        location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  });

  input.addEventListener('click', function() {
    picker.open();
  });
});