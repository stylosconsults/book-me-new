function errorCallback(error) {
  console.log(JSON.stringify(error));
}

function cancelCallback() {
  confirm('Are you sure you want to cancel?');
}
function completeCallback(resultIndicator,sessionVersion) {
  console.log(sessionVersion);
  console.log(resultIndicator);
}
