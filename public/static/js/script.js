function errorCallback(error) {
  console.log(JSON.stringify(error));
}

function cancelCallback() {
  alert('Payment cancelled')
}
function completeCallback(resultIndicator,sessionVersion) {
  console.log(sessionVersion);
  console.log(resultIndicator);
}
