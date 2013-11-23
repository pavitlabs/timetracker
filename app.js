/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var employees = require('./routes/employees');
var http = require('http');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(stylus.middleware({
	src : __dirname + '/public'
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/employees', employees.list);
app.get('/employee/new', employees.addEmployee);
app.post('/employee/new', employees.saveNewEmployee);
app.get('/employee/:id/edit', employees.editEmployee);
app.post('/employee/:id/edit', employees.saveEditedEmployee);
app.post('/employee/:id/delete', employees.deleteEmployee);

// Routes

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
