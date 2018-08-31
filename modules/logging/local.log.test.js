const logger = require('./local.log.js');

let log = new logger({
  moduleName: "Log Test",
  filename: "local.log.test.js",
  rootModule: 'logging',
  logPath: process.cwd() + "/logs/local.log.test"
});

log.log("Test");
