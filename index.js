exports.handler = function(event, context) {

  var https = require('https');

  console.log("REQUEST RECEIVED:\n", JSON.stringify(event));

  switch(event.RequestType) {
    case "Delete":
      respondWith(event, context, "SUCCESS", {});
      break;
    case "Update":
    case "Create":
      https.get('https://discovery.etcd.io/new', function(res) {
        console.log("STATUS: \n", res.statusCode);
        console.log("HEADERS: \n", res.headers);
        var token = '';
        res.on('data', function(d) { token += d; });
        res.on('end', function() {
          respondWith(event, context, "SUCCESS", { Token: token });
        });
      }).on("error", function(err) {
        respondWith(event, context, "FAILED", { Reason: err });
      });
  }

  return;

};

respondWith = function(event, context, status, data) {

  var https = require('https');
  var url = require("url");

  var body = JSON.stringify({
    Status: status,
    Reason: data.Reason || ("See the details in CloudWatch Log Stream: " + context.logStreamName),
    PhysicalResourceId: context.logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: data
  });

  console.log("RESPONSE: \n", body);

  var parsedUrl = url.parse(event.ResponseURL);

  var options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: "PUT",
    headers: {
      "content-type": "",
      "content-length": body.length
    }
  };

  var request = https.request(options, function(response) {
    console.log("STATUS: \n" + response.statusCode);
    console.log("HEADERS: \n" + JSON.stringify(response.headers));
    context.succeed();
  });

  request.on("error", function(error) {
    console.log("ERROR: \n", error);
    context.fail(error);
  });

  request.write(body);
  request.end();

};
