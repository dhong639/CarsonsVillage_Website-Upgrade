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
			name = name + ' ' + queryRes.rows[0].last_name;
			res.render('profile-admin', {
				title: 'Profile ' + queryRes.rows[0].user_id, 
				header: "Advocate/Admin Profile: " + name, 
				email: queryRes.rows[0].email, 
				phone: queryRes.rows[0].phone
			});
		})
		.catch(queryErr => {
			res.send(queryErr);
		});
});

router.post('/user-insert', function(req, res) {
	var reqFields = Object.keys(req.body);
	reqFields.pop();
	var reqValues = Object.values(req.body);
	reqValues.pop();
	var query = buildInsert(reqFields, reqValues, 'User_Account');
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

router.get('/user-insert', function(req,  res) {
	res.sendFile('user-insert.html', {root: 'pages'});
});

router.get('/page-list', function(req, res) {
	client.query('SELECT family_id, page_name, donation_goal, deadline, status FROM Page_Details')
	.then(queryRes => {
		res.render('advocate-pages', {
			headers: ['family_id', 'page_name', 'donation_goal', 'deadline', 'status'], 
			body: queryRes.rows
		});
	})
	.catch(queryErr => {
		res.send(queryErr);
	})
})

router.get('/review/:user_id([0-9]+)/:page_name', function(req, res) {
	var text = 'SELECT * FROM page_details WHERE family_id = $1 AND page_name = $2';
	var values = [req.params.user_id, req.params.page_name];
	client.query(text, values)
		.then(queryRes => {
			res.render('page-review', {
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
});

module.exports = router;