var mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
{
	name: String, 
	file_name: String,
	file_dest: String
})

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;