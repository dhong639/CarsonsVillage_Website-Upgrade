const {Client} = require('pg');

const client = new Client({
	user: 'postgres', 
	host: 'localhost', 
	database: 'EPICS_Project', 
	password: 'postgres', 
	port: 5432
});

module.exports = client;