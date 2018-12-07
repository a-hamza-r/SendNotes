var fs = require('fs');
var path = require('path');
var Class = require('../modules/class');
var Lecture = require('../modules/lecture');
var Notes = require('../modules/note');
var mongoose = require('mongoose');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
		cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
    	var arr = file.originalname.split(".");
    	if (arr.length <= 1) cb(null, Date.now()+"")
    	else cb(null, Date.now()+"."+arr[arr.length-1])
    }
});
var upload = multer({storage: storage});

module.exports = function (app) {

	app.post('/upload/:id', upload.single('file'), (req, res) => {

		var id = req.params.id;
		var file = req.file.filename;
		var arr = file.split(".")
		if (arr.length == 1 || arr[arr.length-1] == "jpg" || arr[arr.length-1] == "jpeg" || 
			arr[arr.length-1] == "txt" || arr[arr.length-1] == "pdf" || arr[arr.length-1] == "png" ||
			arr[arr.length-1] == "doc" || arr[arr.length-1] == "docx" || arr[arr.length-1] == "gif") {

			var notes = new Notes({file_name: req.file.filename, file_dest: '/public/uploads'});
			notes.save(function (err) {
				if (err) {
					console.log(err);
					res.sendStatus(500);
				}

				Notes.findOne({file_name: req.file.filename}, function (error, doc) {
					if (error){
						console.log(error);
						res.sendStatus(500);		
					}
					else {
						Lecture.findOne({_id: id}, function (err1, doc1) {
							if (err1) {
								console.log(err1);
								res.sendStatus(500);
							} else {
								var list = doc1.notes_list;
								list.push(doc._id);
								Lecture.updateOne({_id: id}, 
									{$set: 
										{notes_list: list}
									}, function (err2, resp) {
										if (err2) {
											console.log(err2);
											res.sendStatus(500);
										} else res.send(doc);
									})
							}

						})
					}
				})
			})
		} else res.sendStatus(500);
	})

	app.get('/notes/:id', function (req, res) {
		var id = req.params.id;
		Notes.findOne({_id: id}, function (err, doc) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else if (!doc) res.sendStatus(404);
			else res.send({id: doc._id, file_name: doc.file_name});
		})
	})


	app.get('/course/:id', function (req, res) {
		var id = req.params.id;
		Class.findOne({_id: id}, function (err, doc) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else if (!doc) res.sendStatus(404);
			else {
				res.send(doc);
			}
		})
	})

	app.post('/course', function (req, res) {

		var coursename = req.body.course;
		Class.findOne({name: coursename}, function (err, doc) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else if (!doc) {
				var classs = new Class({name: coursename});
				classs.save(function (error) {
					if (error) {
						console.log(error);
						res.sendStatus(500);
					}
				})
				Class.findOne({name: coursename}, function (error, docc) {
					if (error) {
						console.log(error);
						res.sendStatus(500);
					}
					else if (docc) {
						res.send(docc._id);
					}
				})
			} else {
				res.send(doc._id);
			}
		})
	})


	app.get('/lecture/:id', function (req, res) {
		var id = req.params.id;
		Lecture.findOne({_id: id}, function(err, doc) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else if (!doc) res.sendStatus(404);
			else res.send(doc);
		})
	})

	app.post('/lecture', function (req, res) {
		var course_id = req.body.course_id;
		var lecture = req.body.lecture;

		var lect = new Lecture({name: course_id+lecture});
		lect.save(function (err) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			Lecture.findOne({name: course_id+lecture}, function (error, doc) {
				if (error) {
					console.log(error);
					res.sendStatus(500);
				}
				else if (!doc) res.sendStatus(404);
				else {
					Class.findOne({_id: course_id}, function (err1, doc1) {
						if (err1) {
							console.log(err1);
							res.sendStatus(500);
						} else {
							var list = doc1.lecture_list
							list.push(doc._id)
							// console.log(list)
							Class.updateOne({_id: course_id}, 
								{ $set: 
									{lecture_list: list}
								}, function (errorr, resp) {
									if (errorr) {
										console.log(errorr);
										res.sendStatus(500);
									}
									res.send(doc._id);
								})
						}
					})

				}
			})
		})
	})

	
}
