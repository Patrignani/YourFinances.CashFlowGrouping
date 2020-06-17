var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'YourFinances.CashFlowGrouping',
  description: 'YourFinances Cash Flow Grouping',
  script: 'C:\\Projects\\YourFinances.CashFlowGrouping\\dist\\bin\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();