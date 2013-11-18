
/*
 * GET users listing.
 */
var EmployeeProvider = require('./employeeProvider').EmployeeProvider;
var employeeProvider= new EmployeeProvider('localhost', 27017);

exports.list = function(req, res){
	employeeProvider.findAll(function(error, emps){
	    res.render('employees', {
	          title: 'Employees',
	          employees:emps
	      });
	});
};

exports.add = function(req, res){
	res.render('employee', {
	      title: 'New Employee'
	});
};

/*	app.get('/employee/new', function(req, res) {
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

	//update an employee
	app.get('/employee/:id/edit', function(req, res) {
	    employeeProvider.findById(req.param('_id'), function(error, employee) {
	            res.render('employee',
	            { 
	                    employee: employee
	            });
	    });
	});

	//save updated employee
	app.post('/employee/:id/edit', function(req, res) {
	    employeeProvider.update(req.param('_id'),{
	            title: req.param('title'),
	            name: req.param('name')
	    }, function(error, docs) {
	            res.redirect('/employees');
	    });
	});*/