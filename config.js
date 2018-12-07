const env = process.env.NODE_ENV || 'development';

const development = {
	name: 'SendNotes',
	port: 3000,
	base_url: 'http://localhost',
	db_url: 'mongodb://127.0.0.1:27017/NotesDB_dev'
};

const production = {
	name: 'SendNotes',
	port: process.env.PORT || 3000,
	base_url: process.env.BASE_URL || 'http://localhost',
	db_url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/NotesDB'
};

const config = {
	development,
	production
}

module.exports = config[env];