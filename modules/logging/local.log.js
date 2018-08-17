const fs = require('fs');
const moment = require('moment');

// An Example options object
const OPTS_OBJECT = {
  moduleName: "example",
  filename: "example.file.js",
  rootModule: "example_root",
  logPath: "/path/to/file"
};

const LOG_FORMAT = "YYYY-MM-DD, HH:mm:ss:SS:";

class LogLocal {
  constructor(opts){

    // Load each defined key into this instance
    for(let key in opts){
      if(typeof(key) != 'undefined'){
        this.[key] = opts.[key];
      }
    }

    // Loop to find the next file to create
    // We leave the path undefined, so we will loop until we have a valid path
    let logPath = undefined
    //This value will be appended to the path, and incriment on each run of the program
    let logPathI = 0;
    // Loop
    while(typeof(logPath) == 'undefined'){
      let testPath = this.logPath + "_" + logPathI + ".log"
      try {
        let stats = fs.statSync(testPath);
        //This file exists, continue the loop
        logPathI++;
      } catch(e) {
        this.currentPath = testPath;
        fs.writeFileSync(testPath, this.formatTimestamp(this.createTimestamp());
        fs.appendFileSync(testPath, this.timeStamp() + "Logging initialized");
      }
    }

  }

  log

  timeStamp(){
    return moment().format(LOG_FORMAT) + ": ";
  }

  createTimestamp() {
    let now = moment();
    let timeStamp = {
      nowUnix: now.valueOf(),
      nowHuman: now.format(LOG_FORMAT),
      moduleName: this.moduleName
    }
    return timeStamp;
  }

  formatTimestamp(timeStamp){
    let fStamp = timeStamp.moduleName + '\n';
    fStamp += timeStamp.nowUnix + '\n';
    fStamp += timeStamp.nowUnix + '\n';
  }
}
