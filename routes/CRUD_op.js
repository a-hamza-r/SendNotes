var fs = require('fs');
var path = require('path');

const modules_dir = path.join(__dirname.split(path.sep).pop(), 'modules');


app.get('/', function(req, res) {
    res.sendFile(path.join(modules_dir+'/index.html'))
})

app.get('/course', function (req, res) {
	var coursename = req.body.course;
	Class.findOne({name: coursename}, function (err, doc) {
		if (err) console.log(err)
		else if (!doc) {
			var classs = new Class({name: coursename});
			classs.save(function (error) {
				if (error) console.log(error)
			})
		}
	})
})

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(modules_dir+'/index.html'))
})

app.get('/index2.html', function(req, res) {
    res.sendFile(path.join(modules_dir+'/index2.html'))
})

app.get('/index3.html', function(req, res) {
    res.sendFile(path.join(modules_dir+'/index3.html'))
})

