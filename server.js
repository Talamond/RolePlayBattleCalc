var webpack = require('webpack'),
	WebpackDevServer = require('webpack-dev-server'),
	config = require('./webpack.config');
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	fs = require('fs');

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: { colors: true }
}).listen(3000, '0.0.0.0', function(err) {
	if (err) console.log(err);
	console.log('Listening at ' + 'localhost' + ':' + 3000);
});

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.disable('etag');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});

// must precede "user info check" since there will be no sso header for health check
// user. According to DP, application should not try to authenticate health check user.
app.post('/save', function(req, res) {
	var character = req.body;
	var json = JSON.stringify(character);
	console.log(json);
	console.log(character.name);
	fs.writeFile("characters/" + character.name + ".txt", json, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
});

app.get('/characters', function(req, res) {
	var data=[];

	fs.readdir("characters",function(err,files){
	    if (err) throw err;
	    var c=0;
	    files.forEach(function(file){
	        c++;
	    	var readData = fs.readFileSync("characters/"+file,'utf-8');
	    	var d = JSON.parse(readData);
	        data.push(d);
	    });
		var ret = JSON.stringify(data);
		console.log(ret);
		console.log('test');
		res.type('application/json');
		res.send(ret);
	});
	
});

app.listen(3001, '0.0.0.0');