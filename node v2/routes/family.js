const express = require('express');

const router = express.Router();
const client = require('./../database.js');

const buildInsert = require('./../query-builder.js');

router.get('/:user_id([0-9]+)', function(req, res) {
	var text = 'SELECT * FROM User_Account WHERE user_id = $1';
	var values = [req.params.user_id];
	client.query(text, values)
		.then(queryRes => {
			var name = queryRes.rows[0].first_name;
			if(queryRes.rows[0].middle_name != null)
			{
				name = name + ' ' + queryRes.rows[0].middle_name;
			}
			res.render('profile-family', {
				title: 'Profile' + queryRes.rows[0].user_id, 
				header: 'Family Profile: ' + name, 
				email: queryRes.rows[0].email, 
				phone: queryRes.rows[0].phone, 
				insert_link: '/family/' + req.params.user_id + '/page-insert', 
				list_link: '/family/' + req.params.user_id + '/page-list'
			});
		})
		.catch(queryErr => {
			res.send(queryErr);
		});
});

router.get('/:user_id([0-9]+)/page-list', function(req, res) {
	text = 'SELECT page_name, donation_goal, deadline, status FROM Page_Details WHERE family_id = $1';
	values = [req.params.user_id];
	client.query(text, values)
		.then(queryRes => {
			//res.send(queryRes);
			res.render('client-pages', {
				items: queryRes.rows
			});
		}) 
		.catch(queryErr => {
			res.send(queryErr);
		});
	
});

router.get('/:user_id([0-9]+)/page-insert', function(req, res) {
	res.render('page-insert', {
		title: 'Family ' + req.params.user_id + ' client creation', 
		userAction: '/family/' + req.params.user_id + '/page-insert'
	});
});

router.post('/:user_id([0-9]+)/page-insert', function(req, res) {
	var reqFields = Object.keys(req.body);
	reqFields.pop();
	reqFields.unshift('status');
	reqFields.unshift('family_id');

	var reqValues = Object.values(req.body);
	reqValues.pop();
	reqValues.unshift(1);
	reqValues.unshift(req.params.user_id);
	
	var query = buildInsert(reqFields, reqValues, 'Page_Details');
	client.query(query)
		.then(queryRes => {
			res.render('confirm', {
				message: 'Data submitted successfully', 
				status: queryRes
			});
		})
		.catch(queryErr => {
			res.render('confirm', {
				message: 'Error, submission failed', 
				status: queryErr
			});
		});
});

module.exports = router;