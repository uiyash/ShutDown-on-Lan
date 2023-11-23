# ShutDown-on-Lan-using-Node.js
API to shutdown a Windows computer remotely

it's technically an api! which works on http get requests, we can you it for home-automation, smart home, etc. and it easily works with Google home, Alexa, etc.

All you need is 
1. Node.js development environment 
2. Express.js and 
3. child_process

Initialization Steps (Begin after initializing the environment) 
1. download the file 'app.js' 
2. place it in a folder
3. open terminal in the folder
4. 'npm install express child_process --save'
5. Run the above command the start the sever using
6. 'node app.js'
7. The server is live to wake devices on your network!
8. Make a '.env' file and Save 'SECRET=YOURSECRETCODEHERE'


Operation Modes! 

1. Added commands in the hardcode

  var commands = [{
	        name: 'shutdown',
	        code: '/s'
}, {
	        name: 'reboot',
	        code: '/r'
}, {
        	name: 'hibernate',
	        code: '/h'
}]
    
   Then later http://ip:port/shut/1/:secret/:name make a get request by visiting the link,
    where secret is the secret code you set! and device is the name of the device you wanna wake!
   
For Example

   http://ip:port/shut/1/secret/reboot > the node app will execute 'shutdown /r' on command prompt!

Make The Program run every time
https://stackoverflow.com/questions/20445599/auto-start-node-js-server-on-boot

This isn't something to configure in node.js at all, this is purely OS responsibility (Windows in your case). The most reliable way to achieve this is through a Windows Service.

There's this super easy module that installs a node script as a windows service, it's called node-windows (npm, github, documentation). I've used before and worked like a charm.

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Hello World',
  description: 'The nodejs.org example web server.',
  script: 'C:\\path\\to\\helloworld.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
p.s.

I found the thing so useful that I built an even easier to use wrapper around it (npm, github).

Installing it:

npm install -g qckwinsvc
Installing your service:

> qckwinsvc
prompt: Service name: [name for your service] 'SHUTDOWNONLAN'
prompt: Service description: [description for it]
prompt: Node script path: [path of your node script] 'E:\Documents\GitHub\ShutDown-on-Lan\app.js'
Service installed
Uninstalling your service:

> qckwinsvc --uninstall
prompt: Service name: [name of your service]
prompt: Node script path: [path of your node script]
Service stopped
Service uninstalled
