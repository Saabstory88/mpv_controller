const fs = require('fs');
const path = require('path');

module.exports.readServerConfig = function(configPath){
  try {
    let buf = fs.readFileSync(path.resolve(configPath));
    let config = JSON.parse(buf);
    console.log(config);
    return config;
  } catch (e) {
    console.log(e);
    process.exit();
  }
}
