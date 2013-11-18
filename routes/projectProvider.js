/**
 * 
 */
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ProjectProvider = function(host, port) {
	this.db = new Db('timetracker', new Server("127.0.0.1", 27017, {}),
			{
				safe : false,
				strict : false
			});
	this.db.open(function() {
	});
};

ProjectProvider.prototype.getCollection = function(callback) {
	this.db.collection('projects', function(error, project_collection) {
		if (error)
			callback(error);
		else
			callback(null, project_collection);
	});
};

// find all projects
ProjectProvider.prototype.findAll = function(callback) {
	this.getCollection(function(error, project_collection) {
		if (error)
			callback(error);
		else {
			project_collection.find().toArray(function(error, results) {
				if (error)
					callback(error);
				else
					callback(null, results);
			});
		}
	});
};

// save new project
ProjectProvider.prototype.save = function(projects, callback) {
	this.getCollection(function(error, project_collection) {
		if (error)
			callback(error);
		else {
			if (typeof (projects.length) == "undefined")
				projects = [ projects ];

			for (var i = 0; i < projects.length; i++) {
				project = projects[i];
				project.created_at = new Date();
			}

			project_collection.insert(projects, function() {
				callback(null, projects);
			});
		}
	});
};

// find an project by ID
ProjectProvider.prototype.findById = function(id, callback) {
	this.getCollection(function(error, project_collection) {
		if (error)
			callback(error);
		else {
			project_collection.findOne({
				_id : project_collection.db.bson_serializer.ObjectID
						.createFromHexString(id)
			}, function(error, result) {
				if (error)
					callback(error);
				else
					callback(null, result);
			});
		}
	});
};

// update an project
ProjectProvider.prototype.update = function(projectId, projects, callback) {
	this.getCollection(function(error, project_collection) {
		if (error)
			callback(error);
		else {
			project_collection.update({
				_id : project_collection.db.bson_serializer.ObjectID
						.createFromHexString(projectId)
			}, projects, function(error, projects) {
				if (error)
					callback(error);
				else
					callback(null, projects);
			});
		}
	});
};

exports.ProjectProvider = ProjectProvider;