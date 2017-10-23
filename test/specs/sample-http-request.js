const request = new require('request');
const assert  = require('assert');

describe('It demonstrate RESTful Web Services testing using Node.JS --- ', function () {

  it("shows simpe HTTP's request", function (done){
    request('http://www.google.com', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('statusCode:', response && response.statusCode);    // Print the response status code if a response was received
          console.log('body:', body);   // Print the HTML for the Google homepage.
        }
    });
    done();
  });

  xit("uses GET method to retrieve JSON data from Reddit", function (done){
    let options = {
      url: 'https://www.reddit.com/r/funny.json',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
      }
    };

    request(options, function(err, res, body) {
      console.log(body);
    });
    done();
  });

  it("shows how to use the Custom HTTP's Headers", function (done){
    var options = {
      url: 'https://api.github.com/repos/request/request',
      headers: {
        'User-Agent': 'request'
      }
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          console.log(info.stargazers_count + " Stars");
          console.log(info.forks_count + " Forks");
        }
    });
    done();
  });


});   //end of describe block
