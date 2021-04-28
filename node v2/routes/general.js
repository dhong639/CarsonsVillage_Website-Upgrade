const express = require('express');
const router = express.Router();
const client = require('./../database.js');

/*router.get('/time', function(req, res) {
	client.query('SELECT NOW()')
		.then(queryResults => {
			res.send(queryResults.rows[0]);
		})
		.catch(queryError => {
			res.send(queryError.stack);
		});
});*/

router.get('/user-search', function(req, res) {
	res.sendFile('user-search.html', {root: 'pages'});
});

router.post('/user-search', function(req, res) {
	var query = 'SELECT user_id, first_name, middle_name, last_name FROM User_Account WHERE user_role = $1';
	var values = [req.body.user_role];
	var position = 1;
	if(req.body.first_name != '')
	{
		position += 1;
		query = query + ' AND first_name = $' + position;
		values.push(req.body.first_name);
	}
	if(req.body.middle_name != '')
	{
		position += 1;
		query = query + ' AND middle_name = $' + position;
		values.push(req.body.middle_name);
	}
	if(req.body.last_name != '')
	{
		position += 1;
		query = query + ' AND last_name = $' + position;
		values.push(req.body.last_name);
	}
	console.log(query);
	console.log(values);
	client.query(query, values)
		.then(queryRes => {
			console.log(queryRes.rows[0]);
			res.render('user-results', {
				//title: 'User Results', 
				items: queryRes.rows
			});
			//res.send(queryRes.rows[0]);
		})
		.catch(queryErr => {
			console.error(queryErr.stack);
		});
});

router.get('/p2', function(req, res) {
	res.sendFile('p2.html', {root: __dirname + '/../pages'});
	//console.log(req);
});

module.exports = router;