const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');
const aws = require('aws-sdk');

client.connect();

aws.config.update({
	region: 'us-east-2', 
	accessKeyId: process.env.ACCESS_KEY_ID, 
	secretAccessKey: process.env.SECRET_KEY_ID, 
	apiVersion: "2006-03-01"

});

const s3 = new aws.S3();

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'pug');

app.get('/proposals', function(req, res) {
	s3.listObjects({Bucket: 'dxh170530-test1', Delimiter: '/'}, function(err, data) {
		if(err) console.error("Error!\n" + err);
		//data.CommonPrefixes
		res.render('list-folders', {items: data.CommonPrefixes});
	})
	//res.render('page-proposals');
});

app.get('/proposals/:folder', function(req, res) {
	s3.listObjects({Bucket: 'dxh170530-test1', Prefix: req.params.folder}, function(err, data) {
		if(err) console.error('Error!\n' + err);
		res.render('list-files', {
			title: data.Contents[0], 
			items: data.Contents.slice(1, data.Contents.length)
		});
	})
})

app.get('/proposals/:file(*/*)', function(req, res) {
	s3.getObject({Bucket: 'dxh170530-test1', Key: req.params.file}, function(err, data) {
		if(err) console.error('Error!\n' + err);
		var file = JSON.parse(data.Body.toString('utf-8'));
		res.render('page-review', {
			page_name: file.page_name, 
			visitation_date: file.visitation_date, 
			visitation_location: file.visitation_location, 
			vistitation_description: file.vistitation_description, 
			funeral_date: file.funeral_date, 
			funeral_location: file.funeral_location, 
			funeral_description: file.funeral_description, 
			donation_goal: file.donation_goal, 
			deadline: file.deadline
		})
	})
})

app.listen(port, function() {
	console.log("listening on port " + port);
});
