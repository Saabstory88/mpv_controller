const logger = require('local.log.js');

let log = new logger({
  moduleName: "Log Test",
  filename: "local.log.test.js",
  rootModule: 'logging',
  logPath: "../../logs/local.log.test"
});
