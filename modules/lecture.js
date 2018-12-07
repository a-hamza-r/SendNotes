var mongoose = require('mongoose');
require('./note')

const LectureSchema = new mongoose.Schema(
{
	name: String, 
	notes_list: {
		type: [{
			note_id: {
				type: mongoose.Types.ObjectId,
				ref: 'Note'
			}
		}]
	}
});

LectureSchema.pre('save', function (next) {
	var lecture = this;
	lecture.notes_list = [];
	lecture.count_notes = 0;
	return next();
})

const Lecture = mongoose.model('Lecture', LectureSchema);
module.exports = Lecture; 