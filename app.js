
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var EmployeeProvider = require('./employeeProvider').EmployeeProvider;

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
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var employeeProvider= new EmployeeProvider('localhost', 27017);

app.get('/', routes.index);
app.get('/users', user.list);

//Routes

app.get('/employees', function(req, res){
employeeProvider.findAll(function(error, emps){
    res.render('employees', {
          title: 'Employees',
          employees:emps
      });
});
});

app.get('/employee/new', function(req, res) {
  res.render('employee', {
      title: 'New Employee'
  });
});

//save new employee
app.post('/employee/new', function(req, res){
  employeeProvider.save({
      title: req.param('title'),
      name: req.param('name')
  }, function( error, docs) {
      res.redirect('/employees');
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
