document.getElementById('itinerary-form').addEventListener('submit', function() {
  document.getElementById('spinner').style.display = 'block';
});

// date picker

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