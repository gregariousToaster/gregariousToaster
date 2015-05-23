// var Facebook = require('facebook-node-sdk');

// var facebook = new Facebook({ appID: '1424355067886211', secret: 'fb8a1c1d039a4d90c396f95c7bfd2562'})


// exports.facebook = function(){

//   facebook.api('/questh', function(err, data) {
//     console.log(data); 
//   });
// }

var https = require('https');

exports.facebookGET = function(accessToken, apiPath, callback) {
  // creating options object for the https request
  var options = {
      // the facebook open graph domain
      host: 'graph.facebook.com',

      // secured port, for https
      port: 443,

      // apiPath is the open graph api path
      path: apiPath + '?access_token=' + accessToken,

      // well.. you know...
      method: 'GET'
  };


  // create a buffer to hold the data received
  // from facebook
  var buffer = '';

  // initialize the get request
  var request = https.get(options, function(result){
      result.setEncoding('utf8');

      // each data event of the request receiving
      // chunk, this is where i`m collecting the chunks
      // and put them together into one buffer...
      result.on('data', function(chunk){
          buffer += chunk;
      });

      // all the data received, calling the callback
      // function with the data as a parameter
      result.on('end', function(){
          callback(buffer);
      });
  });
  
  // just in case of an error, prompting a message
  request.on('error', function(e){
      console.log('error from facebook.get(): '
                   + e.message);
  });

  request.end();
}