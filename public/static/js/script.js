const BASE_URL = "http://localhost:5000/api/v1"
const successData = {status: "paid"};

function errorCallback(error) {
  alert("Error happened while paying! Try again.");
}

function cancelCallback() {
  confirm('Are you sure you want to cancel?');
  if(localStorage.getItem('bookingID')){
    localStorage.removeItem('bookingID')
  }
}

function completeCallback(resultIndicator,sessionVersion) {
  fetch(`${BASE_URL}/bookings/${localStorage.getItem('bookingID')}`, {
    method: "PATCH",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(successData)
  }).then(_ => {
    alert("Payment completed! Thank you for booking with GoDiscoverAfrica.");
  }).catch((_)=>{
    alert("Payment failed! Try again")
  });
  localStorage.removeItem('bookingID')
}
