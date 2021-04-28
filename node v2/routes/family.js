const express = require('express');
const router = express.Router();
const client = require('./../database.js');

function buildInsert(listNotNull, listOptional, listReq, listReqValue, fields, values, position) {
	var counter = 0;
	for(var i = 0; i<listReq.length; i++) {
		for(var j = 0; j<listNotNull.length; j++) {
			if(listReq[i] == listNotNull[j] && listReqValue[i] != '') {
				fields.push(listReq[i]);
				values.push(listReqValue[i]);
				counter += 1;
				position.push('$' + counter);
				delete listNotNull[j];
				continue;
			}
		}
		for(var j = 0; j<listOptional.length; j++) {
			if(listReq[i] == listOptional[j] && listReqValue[i] != '') {
				fields.push(listReq[i]);
				values.push(listReqValue[i]);
				counter += 1;
				position.push('$' + counter);
				delete listOptional[j];
				continue;
			}
		}
	}
}

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
				insert_link: '/family/' + req.params.user_id + '/page-insert'
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
	var listNotNull = [
		'family_id', 'page_name', 'status', 
		'donation_goal', 'deadline'];
	var listOptional = [
		'visitation_date', 'visitation_time', 'visitation_location', 'visitation_description', 
		'funeral_date', 'funeral_time', 'funeral_location', 'funeral_description', 
		'obituary', 'images'];
	var listReq = [
		'family_id', 'page_name', 'status', 'visitation_date', 'visitation_time', 'visitation_location', 'visitation_description', 'funeral_date', 'funeral_time', 'funeral_location', 'funeral_description', 
		'obituary', 'images', 
		'donation_goal', 'deadline'];
	var listReqValue = [
		req.params.user_id, req.body.page_name, 1, 
		req.body.visitation_date, req.body.visitation_time, req.body.visitation_location, req.body.visitation_description, 
		req.body.funeral_date, req.body.funeral_time, req.body.funeral_location, req.body.funeral_description, 
		req.body.obituary, req.body.images, 
		req.body.donation_goal, req.body.deadline];
	var fields = [];
	var values = [];
	var position = [];
	buildInsert(listNotNull, listOptional, listReq, listReqValue, fields, values, position);
	var text = 'INSERT INTO Page_Details (' + fields.join(', ') + ') VALUES (' + position.join(', ') + ')';
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

module.exports = router;