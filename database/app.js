//similiar to old assignment
//set-up express, public js, handle-bar, set new PORT, main page, 404 and 500
//new: update form without refresh, delete,reset

var express = require('express');
var handlebars = require('express-handlebars').create({default:'main'}); 
var mysql = require('./lib/dcon.js');
var request = require('request');
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars'); //error here 
app.use(express.static('public')); //error here
app.set('port', 3000);


app.get('/',function(req,res,next) //home page
{
	var context = {};
	mysql.pool.query('SELECT * FROM `workouts`',function(err,row,fields)
	{
		if(err)
		{
			next(err);
			return;
		}
	
	var workoutList = [];
	for( var x in rows)
	{
		workoutList.push({'name':rows[x].name,'reps':rows[x].reps, 'weight':row[x].weight, 'date':rows[x].date, 'lbs':rows[x].lbs,
		'id':rows[x].id})
	}
	context.workouts = workoutList;
	res.render('home',context);
	});
});

 //inserting information
 
app.get('/insert',function(req,res,next)
{

	var context = {};
	mysql.pool.query("INSERT INTO `workouts` (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?, ?, ?, ?, ?,)",
	[res.query.scriptName, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function(err,result)
	{
		if(err)
		{
			next(err);
			return;
		}
		context.workouts = results.insertID;
		res.send(JSON.stringify(context)); //changes
	});

});

app.get('/updateWorkout', function(req,res,next)
{
	var context = {};
	mysql.pool.query('SELECT * FROM `workouts` WHERE id=?',
	[req.query.id],function(err, rows, fields)
	{
		if(err)
		{
			next(err);
			return;
		}
	var workoutList = [];
	for(var x in rows)
	{
		workoutList.push({'name':rows[x].name,'reps':rows[x].reps, 'weight':rows[x].weight, 'date':rows[x].date, 'lbs':rows[x].lbs, 'id':rows[x].id})
	}
	context.workouts = workoutList[0];
	res.render('update',context);
	});

});


app.get('/update', function(req,res,next)
{
	var context = {};
	mysql.pool.query("UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id = ?", [req.query.scriptName, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id], function(err,result)
	{
		mysql.pool.query('SELECT * FROM `workouts`', function(err, rows, fields)
		{
			if(err)
			{
				next(err);
				return;
			}
		var workoutList = [];
		for (var x in rows)
		{
			workoutList.push({'name':rows[x].name, 'reps':rows[x].reps, 'weight':rows[x].weight, 'date':rows[x].date, 'lbs':rows[x].lbs, 'id':rows[x].id})
		}
		context.workouts = workoutList;
		res.render('home', context);
		});
	});
});


app.get('/delete', function(req,res,next)
{
	var context = {};
	mysql.pool.query("DELETE FROM `workouts` WHERE id = ?", [req.query.id], function(err,result)
	{
		if(err)
		{
			next(err);
			return;
		}
	mysql.pool.query('SELECT * FROM `workouts`', function(err,reows,fields)
	{
		if(err)
		{
			next(err);
			return;
		}
		context.results = JSON.stringify(rows);
		res.render('home',context);
		});
	});

});


//table reset
app.get('/reset-table',function(req,res,next)
{
	var context = {};
	mysql.pool.query("Drop table if exists workouts", function(err)
	{
		var createString = "CREATE TABLE workouts("+ "id INT PRIMARY KEY AUTO-INCREMENT,"+
		"name VARCHAR(255) NOT NULL,"+
		"reps INT,"+
		"weight INT,"+
		"date DATE,"+
		"lbs BOOLEAN)";
		mysql.pool.query(createString, function(err)
		{
			context.results = "Tble reset";
			res.render('home',context);
		})
	});
});


//handle err 404 and 500
app.use(function(req,res)
{
	res.status(404);
	res.render(404);
});

app.use(function(err,req,res,next)
{
	console.error(err.stack);
	res.type('plain/text'); //error here
	res.status(500);
	res.render(500);
});

app.listen(app.get('port'),function()
{
	console.log('Express started on http://localhost:'+app.get('port')+ ': press Ctrl-c to terminate.');
});
