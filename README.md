# ShutDown-on-Lan-using-Node.js
API to shutdown a Windows computer remotely

it's technically an api! which works on http get requests, we can you it for home-automation, smart home, etc. and it easily works with Google home, Alexa, etc.

All you need is 
1. Node.js developement environment 
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


Operation Modes! 

1. Added commands in the harcode

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
