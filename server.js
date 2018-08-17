const http = require('http');
const dgram = require('dgram');
const udp = dgram.createSocket('udp4');
const fs = require('fs');

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
  console.log('')
});
