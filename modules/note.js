var mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
{
	name: {
		type: String,
		required: true
	}, 
	author: String
})

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;