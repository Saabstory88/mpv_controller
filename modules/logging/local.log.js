const fs = require('fs');
const moment = require('moment')

const SuperLogger = require('./super.log.js');

// An Example options object
const OPTS_OBJECT = {
  moduleName: "example",
  filename: "example.file.js",
  rootModule: "example_root",
  logPath: "/path/to/file",
  maxLines: 10000
};



class LogLocal extends SuperLogger {
  constructor(opts){
    super(opts);

    if(typeof(this.maxLines) == 'undefined'){
      this.maxLines == OPTS_OBJECT.maxLines;
    }

    // Loop to find the next file to create
    // We leave the path undefined, so we will loop until we have a valid path
    this.currentPath= undefined
    //This value will be appended to the path, and incriment on each run of the program
    this.logPathI = 0;
    // Loop

    this.newFile();

  }

  // This method executes the log for each type of logger
  log(msg){
    fs.appendFile(this.currentPath, '\n' + (this.timeStamp() + msg), function(err){
      if(err){
        return err;
      }
    });
  }

  // This method creates a human readable stamp at the head of each log file
  formatHeader(){

    let now = moment();

    let fileHeader = this.moduleName + '\n';
    fileHeader += this.filename + '\n';
    fileHeader += now.format(this._logFormat) + ' | ' + now.valueOf();

    return fileHeader;
  }

  // This will create the next log file
  newFile(){

    // Assume a new path search
    this.currentPath = undefined;

    // Create a new directory for this module root if none is found
    this._rootPath = this.logPath + this.rootModule + '/';

    if (!fs.existsSync(this._rootPath)){
      fs.mkdirSync(this._rootPath);
    }

    // Loop until we can create a new file
    while(typeof(this.currentPath) == 'undefined'){
      let testPath = this._rootPath + this.filename + '.' + this.logPathI + ".log"
      try {
        let stats = fs.statSync(testPath);
        //This file exists, continue the loop
        this.logPathI++;
      } catch(e) {
        fs.writeFileSync(testPath, this.formatHeader());
        this.currentPath = testPath;

        this.logInternal("Created new log file at: " + this.currentPath);
      }
    }

    this.log("Logging initialized");
  }

}

module.exports = LogLocal;
