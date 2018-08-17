const http = require('http');
const dgram = require('dgram');
const fs = require('fs');
const redis = require('redis');

//UDP handler
let udp = dgram.createSocket('udp4');
//Redis client
let rc = redis.createClient();

//Validates the parsed JSON coming from player instances
function validateAndStore(testData){
  
}

//Listener for incoming data
udp.on('message', function(data){
  //Attempt to parse the data
  try {
    let parsedData = JSON.parse(data);
    validateAndStore(parsedData);
  } catch (e) {
    console.log(e);
  }
});

server.on('listening', function(){
  console.log('RELAY: Online')
});
