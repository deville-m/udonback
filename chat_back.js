var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors');
var { spawn } = require('child_process');

const SAVE_PATH = "uploads";

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

io.on('connection', function(socket){
	socket.on('message', function(msg){
		if (msg && msg.message)
			io.emit('message', msg);
	});
});

app.post('/upload', function (req, res) {
	console.log("POST");

	const SAVE_DIR = `${SAVE_PATH}/${req.body.genre}`;
	const options = [
		'--no-playlist',
		'-x',
		'--audio-format', 'mp3',
		'--audio-quality', '0',
		`-o ${SAVE_DIR}/%(title)s.%(ext)s`,
		req.body.url];

	ytdl = spawn('youtube-dl', options);


	ytdl.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	ytdl.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

	ytdl.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});

	console.log("SAVED TO " + SAVE_DIR);
	res.sendStatus(200);
})

http.listen(5001, function(){
	console.log('listening on *:5001');
});
