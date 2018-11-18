var mongoose = require('mongoose');
require('./note')

const LectureSchema = new mongoose.Schema(
{
	name: {
		type: String,
		required: true
	}, 
	notes_list: {
		type: [{
			note_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Note'
			}
		}]
	},
	count_notes: Number
});

LectureSchema.pre('save', function (next) {
	var lecture = this;
	lecture.notes_list = [];
	lecture.count_notes = 0;
	return next();
})

const Lecture = mongoose.model('Lecture', LectureSchema);
module.exports = Lecture; 