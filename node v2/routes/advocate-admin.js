const express = require('express');
const router = express.Router();
const client = require('./../database.js'); 

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
	var fields = ['user_id', 'email', 'user_role', 'password_hash', 'password_salt', 'first_name'];
	var position = ['$1', '$2', '$3', '$4', '$5', '$6']; 
	var values = [req.body.user_id, req.body.email, req.body.user_role, req.body.password_hash, req.body.password_salt, req.body.first_name];
	if(req.body.middle_name != '')
	{
		fields.push('middle_name');
		position.push('$' + (position.length+1));
		values.push(req.body.middle_name);
	}
	fields.push('last_name');
	values.push(req.body.last_name);
	position.push('$' + (position.length+1));
	if(req.body.phone != '')
	{
		fields.push('phone');
		position.push('$' + (position.length+1));
		values.push(req.body.phone);
	}
	var text = 'INSERT INTO User_Account (' + fields.join(', ') + ') VALUES (' + position.join(', ') + ')';
	client.query(text, values)
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

module.exports = router;
