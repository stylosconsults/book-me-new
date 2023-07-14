const BASE_URL = "https://api.bookme.rw/api/v1"
const successData = {status: "PAID"};

function errorCallback(error) {
  alert("Error happened while paying! Try again.");
}

function cancelCallback() {
  confirm(`Are you sure you want to cancel?`);

  if(sessionStorage.getItem('bookingID')){
    sessionStorage.removeItem('bookingID')
  }
}

function completeCallback(resultIndicator,sessionVersion) {
  fetch(`${BASE_URL}/bookings/${sessionStorage.getItem('bookingID')}`, {
    method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(successData)
  }).then((res)=> {
    if(res.ok){
    alert("Payment completed! Thank you for booking with GoDiscoverAfrica.");
  }else{
    alert("Payment failed! Try again")
  }
  }).catch((_)=>{
    alert("Payment failed! Try again")
  });
  sessionStorage.removeItem('bookingID')
}
