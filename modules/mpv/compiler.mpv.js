const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = function(playModes){
  for(let i = 0; i < playModes.length; i++){

    // For each contained file, resolve the whole path
    for(let j = 0; j < playModes[i].contents.length; j++){
      playModes[i].contents[j] = path.resolve(playModes[i].mediaPath, playModes[i].contents[j]);
    }

    // Create a static file for each palylist
    if(playModes[i].type == "playlist" && playModes[i].contents.length > 1){
      let playlist = "";
      for(let j = 0; j < playModes[i].contents.length; j++){
        playlist += playModes[i].contents[j];
        playlist += os.EOL;
      }

      fs.writeFileSync(playModes[i].mediaPath + playModes[i].mode + '.txt', playlist);

      playModes[i].contents[0] = playModes[i].mediaPath + playModes[i].mode + '.txt';
    }
  }

  console.log(playModes);
  return playModes;
}
