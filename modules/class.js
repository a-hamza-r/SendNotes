var mongoose = require('mongoose');
require('./lecture')

const ClassSchema = new mongoose.Schema(
{
	name: String, 
	lecture_list: {
		type: [{
			lect_id: {
				type: mongoose.Types.ObjectId, 
				ref: 'Lecture'
			}
		}]
	}
});

ClassSchema.pre('save', function(next) {
	var classs = this;
	classs.count_lectures = 0;
	classs.lecture_list = [];
	return next();
})

const Class = mongoose.model('Class', ClassSchema);
module.exports = Class;