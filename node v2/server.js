const express = require('express');
const app = express();
const port = 3000;

const client = require('./database.js');

const routeLogin = require('./routes/login.js');
const routeGeneral = require('./routes/general.js');
const routeAdvocateAdmin = require('./routes/advocate-admin.js');
const routeFamily = require('./routes/family.js');

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'pug');

client.connect();

client.query('SELECT NOW()')
	.then(res => console.log(res.rows[0]))
	.catch(err => console.error(err.stack));

app.get('/', function(req ,res) {
	res.redirect('/login');
});

app.use('/login', routeLogin);

app.use('/general', routeGeneral);

app.use('/advocate-admin', routeAdvocateAdmin);

app.use('/family', routeFamily);

app.listen(port, function() {
	console.log('Listening on port ' + port + '...');
});
//app.use(express.static(__dirname));

/*app.get('/', function(req, res) {
	res.sendFile('index.html', {root: 'pages'});
});

app.use('/user', routes);

app.get('/data', function(req, res){
	client.query('SELECT NOW()')
		.then(queryRes => {
			console.log(queryRes.rows[0]);
			res.send(queryRes.rows[0]);
		})
		.catch(queryErr => console.error(queryErr.stack));
})

app.listen(port, function() {
	console.log('Listening on port 3000');
});*/