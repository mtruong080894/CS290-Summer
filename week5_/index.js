//provide URL(will be commented also but if i forget):
//http://50.112.39.131:3000/
//Req: H1 tag for both POST and GET

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//from video/module

app.get('/', function(req, res)
{
	var qParams = []; 
	for(var p in req.query)
	{
		qParams.push({'name': p, 'value': req.query[p]});
	}
	var context = {};
	context.dataList = qParams;
	res.render('get', context); 
});

app.post('/', function(req,res)
{
	var qParams = [];
	for (var p in req.query)
	{
		qParams.push({'name': p, 'value': req.query[p]});


	{
	var bParams = []; 
	for (var b in req.body)
	{
		bParams.push({'name': b, 'value': req.body[b]});


	}
	var context = {};
	context.queryList = qParams;
	context.bodyList = bParams;
	res.render('post', context);
});		

app.use(function(req,res)
{
	res.status(404);
	res.render('404');

}

app.use(function(err,req,res,next)
{
	console.log(err.stack);
	res.status(500);
	res.render('500'); 

app.listen(app.get('port'), function()
{
	console.log('Express started on port 3000');


});



