var mongoose = require('mongoose');
require('./lecture')

const ClassSchema = new mongoose.Schema(
{
	name: {
		type: String,
		required: true
	}, 
	lecture_list: {
		type: [{
			lect_id: {
				type: mongoose.Schema.Types.ObjectId, 
				ref: 'Lecture'
			}
		}]
	},
	count_lectures: Number
});

ClassSchema.pre('save', function(next) {
	var classs = this;
	classs.count_lectures = 0;
	classs.lecture_list = [];
	return next();
})

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;