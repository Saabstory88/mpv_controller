const DEFAULT = {
  player: "none",
  strings: ['{ "command": ["get_property", "playback-time"] }\n']
}

// Standard format playerName:command:argument

function parseCMD(cmd){
  cmd = cmd.toString();
  let parsed = cmd.split(':');
  let command;
  if(parsed.length == 2){
    command = {
      player: parsed[0],
      command: parsed[1]
    }
  } else if (parsed.length == 3){
    command = {
      player: parsed[0],
      command: parsed[1],
      argument: parsed[2]
    }
  } else {
    return undefined;
  }

  return command;
}

module.exports = function(cmd, playModes){
  if(typeof(cmd) != 'undefined'){

    let command = parseCMD(cmd);
    if(typeof(command) == 'undefined'){
      return DEFAULT;
    }

    let message = {
      player: command.player,
      strings: []
    }

    // Parse the actual action we want to perform
    if(command.command == 'mode'){

      let matched = false;
      // Loop through the modes to find a matching
      playModes.forEach(function(playMode){
        if(playMode.mode == command.argument){
          console.log("Matched args")
          // If a file is the target
          if(playMode.type == 'file'){

            message.strings.push({ command: ["loadfile", playMode.contents[0], "replace" ] });
            message.strings.push({ command: ["set_property", "loop", playMode.loop ] });

          // If a playlist is the target
          } else if (playMode.type == 'playlist') {

            message.strings.push({ command: ["loadlist", playMode.contents[0], "replace" ] });
            message.strings.push({ command: ["set_property", "loop", "no" ] });
            message.strings.push({ command: ["set_property", "loop-playlist", playMode.loop ] });

          }
          console.log(message);
          matched = true;
        }
      });
      if(matched){
        return message;
      }
    }

  } else {
    return DEFAULT;
  }
  return DEFAULT;
}
