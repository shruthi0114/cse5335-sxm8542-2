var express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
var path = require('path');
var conn = require('connect');

var db;
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

MongoClient.connect('mongodb://shruthi:shruthi@ds115798.mlab.com:15798/heroku_vqwhqwmd', function (err, database){

	if (err) return console.log(err)
	db = database;
	app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
	});
});

app.get('/', function (req, res) { 	
	res.render('pages/index');
	console.log(req.body);
});
  
app.post('/restaurant', function (req, res) {
	console.log(req.body.id);  
	var n = req.body.id;    
 	res.setHeader('Content-Type', 'application/json');  
	db.collection('project2').find({'Id':n}).toArray(function (err,result) {			
		res.send(JSON.stringify(result));
	});	
})  