/*
 * GET users listing.
 */
var EmployeeProvider = require('./employeeProvider').EmployeeProvider;
var employeeProvider = new EmployeeProvider('localhost', 27017);

exports.list = function(req, res) {
	employeeProvider.findAll(function(error, emps) {
		res.render('employees', {
			title : 'Employees',
			employees : emps
		});
	});
};

exports.addEmployee = function(req, res) {
	res.render('employee', {
		employee : undefined, 
		title : 'New Employee'
	});
};

exports.saveNewEmployee = function(req, res) {
	employeeProvider.save({
		title : req.param('title'),
		name : req.param('name')
	}, function(error, docs) {
		res.redirect('/employees');
	});
};

// update an employee
exports.editEmployee = function(req, res) {
	console.log(req.param('_id'));
	employeeProvider.findById(req.param('_id'), function(error, employee) {
		res.render('employee', {
			employee : employee
		});
	});
};

//save updated employee
exports.saveEditedEmployee = function(req, res) {
	employeeProvider.update(req.param('_id'), {
		title : req.param('title'),
		name : req.param('name')
	}, function(error, docs) {
		res.redirect('/employees');
	});
};
