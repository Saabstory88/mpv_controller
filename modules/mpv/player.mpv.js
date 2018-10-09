const net = require('net');
const EventEmitter = require('events').EventEmitter;
const { spawn } = require("child_process");
const os = require('os');
const path = require('path');

const test = '{ "command": ["get_property", "playback-time"] }\n'

class MPVPlayer extends EventEmitter {
  constructor(config, index){
    super();
    this.config = MPVPlayer.compileConfig(config, index);
    this.ipcName = MPVPlayer.getIPCName(this.config.name);
    this.config.args = this.config.args.concat(['--input-ipc-server=' + this.ipcName]);

    let self = this;

    console.log("Starting MPV with args ");
    console.log(this.config.args);

    this.mpv = spawn('mpv', this.config.args);

    setTimeout(function(){
      self.connect();
    }, 500);
  }

  sendCommand(command){
    let msg = test;

    if(typeof(command) != 'undefined'){
      msg = command;
    }

    let sendStr = JSON.stringify(msg) + '\n';
    console.log(sendStr);
    this.sock.write(sendStr, () => {
      this.emit('status', 'Sent ' + sendStr);
    });

  }

  connect(){
    this.sock = net.createConnection(this.ipcName);

    this.sock.on('connect', () => {
      this.emit('ready');
      //this.sendCommand();
    });

    this.sock.on('data', (msg) => {
      if(msg != ""){
        this.emit('data', msg.toString());
      }
    });
  }

  static getIPCName(name){
    let platform = os.type();
    if(platform == "Windows_NT"){
      let pipeName = path.sep + path.sep + '.' + path.sep + 'pipe' + path.sep + name
      return pipeName;
    } else if (platform == "Linux" || platform == "Darwin"){
      return '/tmp/' + name + '.sock';
    }
  }

  static compileConfig(config, index){
    // Create an object to return
    let conf = {};
    conf.playModes = config.playModes;
    conf.mediaPath = config.mediaPath;
    conf.name = config.players[index].name;
    conf.args = config.players[index].args.concat(config.common.args);
    return conf;
  }

}

module.exports = MPVPlayer;
