const moment = require('moment');
const util = require('util');

const LOG_FORMAT = "YYYY-MM-DD, HH:mm:ss:SS";

class SuperLogger {
  constructor(opts){
    // Load each defined key into this instance
    for(let key in opts){
      if(typeof(key) != 'undefined'){
        this[key] = opts[key];
      }
    }

    this.logInternal('Created a new logger based on these options: \n' + util.inspect(opts));

    this._logFormat = LOG_FORMAT;
  }

  logInternal(msg){
    if(this._debug){
      console.log(msg);
    }
  }

  timeStamp(){
    return moment().format(this._logFormat) + " | ";
  }

}

module.exports = SuperLogger;
