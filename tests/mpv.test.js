const mpv = require('node-mpv');

const OPTIONS = JSON.stringify({
  socket: "/tmp/node-mpv.sock"
});

const FLAGS = [
  "--fullscreen",
  "--idle"
];

let player = new mpv(OPTIONS, FLAGS);

player.on('statuschange', function(status){
  console.log(status);
});

player.play();

player.load('~/Videos/Mural.mp4');
