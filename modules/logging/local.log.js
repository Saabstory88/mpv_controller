const fs = require('fs');

const SuperLogger = require('./super.log.js');

// An Example options object
const OPTS_OBJECT = {
  moduleName: "example",
  filename: "example.file.js",
  rootModule: "example_root",
  logPath: "/path/to/file"
};



class LogLocal extends SuperLogger {
  constructor(opts){
    super(opts)

    // Loop to find the next file to create
    // We leave the path undefined, so we will loop until we have a valid path
    this.currentPath= undefined
    //This value will be appended to the path, and incriment on each run of the program
    let logPathI = 0;
    // Loop
    while(typeof(this.currentPath) == 'undefined'){
      let testPath = this.logPath + "_" + logPathI + ".log"
      try {
        let stats = fs.statSync(testPath);
        //This file exists, continue the loop
        logPathI++;
      } catch(e) {
        fs.writeFileSync(testPath, this.formatHeader(this.createTimestamp()));
        fs.appendFileSync(testPath, this.timeStamp() + "Logging initialized" + '\n');
        this.currentPath = testPath;
      }
    }

  }

  log(msg){
    fs.appendFile(this.currentPath, (this.timeStamp() + msg + '\n'), function(err){
      if(err){
        return err;
      }
    });
  }

}

module.exports = LogLocal;
