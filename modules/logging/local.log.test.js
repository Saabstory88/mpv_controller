const logger = require('./local.log.js');

let log = new logger({
  moduleName: "Local Log Test",
  filename: "local.log.test.js",
  rootModule: 'logging',
  logPath: process.cwd() + "/logs/",
  maxLines: 10000,
  _debug: true
});

log.log("Test");

log.newFile();

log.log("Test Again");
