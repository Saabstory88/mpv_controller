const colors = require('colors');
const { spawn } = require('child_process');

let ARGS = [
  "--idle=yes",
  "--image-display-duration=inf",
  "--force-window",
  "--fs",
  "--osc=no",
  "--input-ipc-server=/tmp/mpvplayer.sock",
  "/home/saabstory88/Videos/Mural.mp4"
];

module.exports = function(logger){

  //Have we been passed a logging function?
  let log = console.log;
  //If we have, override the defaults
  if(typeof(logger) == 'undefined'){
    log("launcher.mpv.js:".red + " Using default console logging");
  } else {
    log = logger;
  }

  let player = spawn('mpv', ARGS);

  log(player.pid);

  return player;

}
