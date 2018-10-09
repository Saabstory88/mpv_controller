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

udp.bind(8889, loopback(), function(){
  udp.send("left:mode:rss_test_1", 8888, loopback(), function(){
    udp.close(function(){
      process.exit();
    });
  });
});
