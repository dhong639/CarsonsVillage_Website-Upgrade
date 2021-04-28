const express = require('express');
const router = express.Router();
const client = require('./../database.js');

router.get('/', function(req, res) {
	res.render('login');
});

router.post('/', function(req, res) {
	var text = 'SELECT user_id FROM User_Account WHERE email = $1 AND user_role = $2';
	var values = [req.body.email, req.body.user_role];
	client.query(text, values)
		.then(queryRes => {
			if(queryRes.rows[0] != null)
			{
				if(values[1] == 1)
				{
					res.redirect('/family/' + queryRes.rows[0].user_id);
				}
				else if(values[1] == 2)
				{
					res.redirect('/advocate-admin/' + queryRes.rows[0].user_id);
				}
			}
			else
			{
				res.redirect('/login/error');
			}
		})
		.catch(queryErr => {
			res.send(queryErr);
		});
});

router.get('/error', function(req, res) {
	res.render('login', {
		error: '\nThis message denotes an error in the login process\n'
	}); 
});

module.exports = router;