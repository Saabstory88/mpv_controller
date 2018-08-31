const moment = require('moment');

const LOG_FORMAT = "YYYY-MM-DD, HH:mm:ss:SS";

class SuperLogger {
  constructor(opts){
    // Load each defined key into this instance
    for(let key in opts){
      if(typeof(key) != 'undefined'){
        this[key] = opts[key];
      }
    }

    this._logFormat = LOG_FORMAT;
  }

  timeStamp(){
    return moment().format(this._logFormat) + ": ";
  }

  createTimestamp() {
    let now = moment();
    let timeStamp = {
      nowUnix: now.valueOf(),
      nowHuman: now.format(this._logFormat),
      moduleName: this.moduleName
    }
    return timeStamp;
  }

  formatHeader(timeStamp){
    let fStamp = timeStamp.moduleName + '\n';
    fStamp += timeStamp.nowUnix + '\n';
    fStamp += timeStamp.nowHuman + '\n';
  }

}

module.exports = SuperLogger;
