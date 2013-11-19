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

/*
 * app.get('/employee/new', function(req, res) { res.render('employee', { title:
 * 'New Employee' }); });
 * 
 * //save new employee app.post('/employee/new', function(req, res){
 * 
 * });
 * 
 * //update an employee app.get('/employee/:id/edit', function(req, res) {
 * employeeProvider.findById(req.param('_id'), function(error, employee) {
 * res.render('employee', { employee: employee }); }); });
 * 
 * //save updated employee app.post('/employee/:id/edit', function(req, res) {
 * employeeProvider.update(req.param('_id'),{ title: req.param('title'), name:
 * req.param('name') }, function(error, docs) { res.redirect('/employees'); });
 * });
 */