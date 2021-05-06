const express = require('express');
const { query } = require('./../database.js');
const router = express.Router();
const client = require('./../database.js');

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

router.get('/pages/page-search', function(req, res) {
	res.sendFile('page-search.html', {root: 'pages'});
});

router.post('/pages/page-search', function(req, res) {
	var text = 'SELECT * FROM Page_Details WHERE status = $1';
	var values = [req.body.status];
	if(req.body.page_name != '' && req.body.deadline != '') {
		text = text + ' AND page_name LIKE $2 AND deadline = $3';
		values.push('%' + req.body.page_name + '%');
		values.push(req.body.deadline);
	}
	else if(req.body.page_name != '') {
		text = text + ' AND page_name LIKE $2';
		values.push('%' + req.body.page_name + '%');
	}
	else if(req.body.deadline != '') {
		text = text + ' AND deadline = $2';
		values.push(req.body.deadline);
	}
	client.query(text, values)
			.then(queryRes => {
				res.render('page-search', {
					items: queryRes.rows
				});
			})
			.catch(queryErr => {
				res.send(queryErr);
			});
});

router.get('/pages/:user_id([0-9]+)/:page_name', function(req, res) {
	var text = 'SELECT * FROM Page_Details WHERE family_id = $1 AND page_name = $2';
	var values = [req.params.user_id, req.params.page_name];
	client.query(text, values)
		.then(queryRes => {
			res.render('family-page', {
				title: req.params.page_name, 
				page_name: req.params.page_name,
				visitation_date: queryRes.rows[0].visitation_date, 
				visitation_location: queryRes.rows[0].visitation_location, 
				vistitation_description: queryRes.rows[0].visitation_description, 
				funeral_date: queryRes.rows[0].funeral_date, 
				funeral_location: queryRes.rows[0].funeral_location, 
				funeral_description: queryRes.rows[0].funeral_description, 
				donation_goal: queryRes.rows[0].donation_goal, 
				deadline: queryRes.rows[0].deadline, 
				obituary: queryRes.rows[0].obituary
			})
		})
		.catch(queryErr => {
			res.send(queryErr);
		});
})

module.exports = router;