const dgram = require('dgram');
const udp = dgram.createSocket('udp4');
const os = require('os');

let loopback = function(){
  let platform = os.type();
  if(platform == 'Windows_NT'){
    return 'localhost';
  } else {
    return '127.0.0.1';
  }
}

let commands = [];

if(process.argv.length > 2){
  commands = process.argv.slice(2, process.argv.length);
} else {
  console.log("No Commands!");
  process.exit();
}

udp.bind(8889, loopback(), function(){

  for(let i = 0; i < commands.length; i++){
    udp.send(commands[i], 8888, loopback(), function(){
      console.log("Sent command: " + commands[i]);
    });
  }

  setTimeout(function(){
    udp.close(function(){
      process.exit();
    });
  }, 500);
});
