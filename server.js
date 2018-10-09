const http = require('http');
const dgram = require('dgram');
const udp = dgram.createSocket('udp4');
const fs = require('fs');
const FileOps = require('./modules/file_ops/server.file.js');
const MPVPlayer = require('./modules/mpv/player.mpv.js');
const os = require('os');
const compileModes = require('./modules/mpv/compiler.mpv.js');
const parseCommand = require('./modules/mpv/parser.mpv.js');

// Placeholder for future logging
let log = function(msg){
  console.log("MPV-SERVER: " + msg);
}

// -----------------------------
// INITIALIZATION
// -----------------------------
// Process the command line args
let args = process.argv;
let config;

// Make sure we have executed from the command line
if(args[0].includes('node') && args[1].includes('server.js')){
  // Only execute if we have a config file
  if(typeof(args[2]) != 'undefined'){
    config = FileOps.readServerConfig(args[2]);
  } else {
    log("No configuration file specified!");
    process.exit();
  }

// A compiled mode should give us the wrong args
} else {
  console.log(args);
  log("Compiled execution not supported!");
  process.exit();
}

// -----------------------------
// SPIN UP MPV PROCESSES
// -----------------------------
// Add a new player for each in the config
let players = new Array();
for(let i = 0; i < config.players.length; i++){
  let player = new MPVPlayer(config, i);
  players.push(player);
}

for(let i = 0; i < players.length; i++){
  players[i].on('ready', function(){
    log("Player: " + players[i].config.name + " is ready" );
  });

  players[i].on('data', function(msg){
    log("Player: " + players[i].config.name + ": " + msg );
  });
}

// -----------------------------
// COMPILE RESOURCES
// -----------------------------
config.playModes = compileModes(config.playModes);

// -----------------------------
// COMMUNICATION
// -----------------------------
// Add a new player for each in the config
let loopback = function(){
  let platform = os.type();
  if(platform == 'Windows_NT'){
    return 'localhost';
  } else {
    return '127.0.0.1';
  }
}

let sendCommand = function(command){
  players.forEach(function(player){
    console.log(player.config.name);
    if(player.config.name == command.player){
      command.strings.forEach(function(str){
        player.sendCommand(str);
      });
    }
  });
}

udp.bind(8888, loopback(), function(){
  log("UDP Channel Ready");
});

// Listener for incoming commands
udp.on('message', function(data){
  //Attempt to parse the data
  let command = parseCommand(data, config.playModes);
  console.log(command);
  sendCommand(command);
});
