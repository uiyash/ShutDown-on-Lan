require('dotenv').config()
const app = require('express')();
const port = process.env.PORT || 8091;
const secret = process.env.SECRET || 'Your Secret!'; // some secret for a basic level of protection!
const {
	exec
} = require('child_process');

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

console.log(`The Secret is ${secret}`);

function shutdown(code) {
	exec('shutdown ' + code, (err, stdout, stderr) => {
		if (err) {
			// node couldn't execute the command
			return {
				status: 0,
				message: stderr
			}
		}
		// the *entire* stdout and stderr (buffered)
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
		return {
			status: 1,
			message: stdout
		}
	});
}


app.get('/', function (req, res) {
	res.send('Hello, This is an Encrypted API service Which can control this computer! only if you know the pass-word!');
	shutdown();
});

app.get('/shut/1/:secret/:code', function (req, res) {

	let sec = req.params.secret,
		dev = req.params.code,
		code = ' ',
		err = '';

	if (sec === secret) {

		for (let i = 0; i < commands.length; i++) {
			if (commands[i].name === dev) {
				code = commands[i].code;
			}
		}
		if (code != ' ') {
			shutdown(code);
			err = 'Kudos! Command: ' + code + ' Executed';
			res.send(err);
			console.log(err);
		} else {
			res.send('Error! Command: ' + dev + ' cannnot be found');
		}
	} else {
		err = 'Secret Error ' + sec + ' is not our secret! and btw the command that requested was ' + dev;
		console.log(err);
		res.send(err);
	}

});

app.get('/shut/2/:secret/:code', function (req, res) {

	let sec = req.params.secret,
		mac = req.params.code;

	if (sec === secret) {
		shutdown(code);
		res.send('Command Executed!')
	} else {
		console.log('Secret Error');
		res.send('Secret Error');
	}
});


app.listen(port, function () {
	console.log('Device is ready to ShutDown! on Port: ' + port);
});
