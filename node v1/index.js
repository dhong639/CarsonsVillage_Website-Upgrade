/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/')
});*/

/*const url = require('url');
const strUp = require('upper-case');
const square = require('./mymodule.js');

var webAddr = 'http://www.localhost.com/demo/?action=getData$id=123';
var urlData = url.parse(webAddr);
console.log(urlData.protocol);
console.log(urlData.host);
console.log(strUp.upperCase("hello"));
square(13);*/

/*const express = require('express');
const app = express();
const port = 3000;

//app.get('/', (req, res) => res.send('Hello World!'));
//app.get('/', function(req, res) {
//    res.send('Hello World from Express');
//});

app.set('view engine', 'pug')

app.get('/', function(req, res) {
    res.render('index', {title: 'Hey Express', message: 'Hello there!', expressjs: 'Express JS'});
});

//app.listen(port, () => console.log('Example app listening on port 3000'));
app.listen(port, function() {
    console.log('Example app listening on port 3000');
});*/

/*const express = require('express');                     //load express server to handle manage web application
const bodyParser = require('body-parser');              //load bodyParser to parse data input
const app = express();                                  //define experss application
const port = 3000;                                      //define port on local host

app.use(express.static(__dirname));                     //set as root directory of node files

app.use(bodyParser.urlencoded({extended:false}));      //use deprecated body parser
app.set('view engine', 'pug');                          //use PUG as website template for confirmation page

app.get('/', function(req, res) {                       //route to root '/' on localhost:3000
    res.sendFile('index.html', {root: __dirname});      //display index.html file from root directory of node files
});

app.post('/submit', function(req, res) {                //route to localhost:3000/submit
    console.log(req.body);                               //use body-parser to read input and log to console
    res.render('index', {
        title: 'Data saved', 
        message: 'Data saved successfully'});           //display confirmation bypulling index.pug from the views folder
});

app.listen(port, function() {                           //verify application is running
    console.log('Example app listening on port 3000');  //log confirmation to console
});*/

//https://www.youtube.com/watch?v=lldeWkkG9xA&list=PLCakfctNSHkFj-ba7BfwKv1foU4Wemy87&index=6

/*const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const {Client} = require('pg');
const client = new Client({
    user: 'postgres', 
    host: 'localhost', 
    database: 'EPICS_Project', 
    password: 'postgres', 
    port: 5432
});

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    res.sendFile('index.html', {root:__dirname});
});

client.connect();

client.query('SELECT NOW()')
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack))
    .finally(() => client.end());

app.listen((port, function(){
    console.log('Example app listening on port 3000');
}));*/

/*
*   database_input.js
*   David Hong
*   4/19/2021, v1
*   defines a server function to insert data into database through GUI (see index.html)
*/

/*
*   Declare required packages
*   Set references to important objects
*   Note: body-parser is deprecated
*/
const express = require('express');                     //load express server to handle manage web application
const bodyParser = require('body-parser');              //load bodyParser to parse data input
const app = express();                                  //define experss application
const port = 3000;                                      //define port on local host
/*
*   Set database credentials
*   Note: requires access token in future
*   Note: credentials should not be publically accessible
*/
const {Client, Connection} = require('pg');                         //define postgresql connection
const client = new Client({                             //initialize postgresql connection
    user: 'postgres',                                   //identify with \conninfo on the postgresql terminal
    host: 'localhost', 
    database: 'EPICS_Project', 
    password: 'postgres', 
    port: 5432
});
/*
*   Initialize server resources
*/
app.use(express.static(__dirname));                     //set as root directory of node files
//app.use(bodyParser.urlencoded({extended:false}));       //use deprecated body parser
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'pug');                          //use PUG as website template for confirmation page
/*
*   Defines the "homepage" of the web application
*/
app.get('/', function(req, res) {                       //route to root '/' on localhost:3000
    res.sendFile('index.html', {root: __dirname});      //display index.html file from root directory of node files
});
/*
*   Fetch query from databas
*   Display query from database
*/
app.get('/users', function(req, res) {
    client.query("SELECT * FROM User_Account ORDER BY user_id ASC", function(err, values) {
        //console.log(values.rows);
        if (err) throw err 
            res.render('user', {
                title: 'User details', 
                items: values.rows,                     //iterate through returned collection
                url: '/?'                               //return to homepage, root directory
            });
    });
});
/*
*   Initiate database connection
*/
client.connect();                                       //connect to postgresql database
client.query('SELECT NOW()')                            //identify current time
    .then(res => console.log(res.rows[0]))              //confirm operation
    .catch(e => console.error(e.stack));                //define error
/*
*   Define submission of Html form
*/
app.post('/submit', function(req, res) {                            //submit items in form
    /*
    *   Attempt to insert values into database
    */
    var insertStatement = "INSERT INTO User_Account (user_id, email, user_role, password_hash, password_salt, first_name, middle_name, last_name, phone) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    var insertValues = [req.body.user_id, req.body.email, req.body.user_role, req.body.password_hash, req.body.password_salt, req.body.first_name, req.body.middle_name, req.body.last_name, req.body.phone];
    /*
    *   Check for errors
    *   If no errors, display success page
    *   If errors found, display first available error in failure page
    */
    client.query(insertStatement, insertValues)                     //insert query based on insertStatement and inserValues
        .then(queryValue => {                                       //confirm operation
            console.log(queryValue.command + "\n" + insertValues);  //log results to console
            res.render('confirm', {                                 //generate template page
                title: 'Submission Status', 
                message: 'Data submitted successfully'
            });
        })
        .catch(error => {                                           //define error
            console.error(error);                                   //log error in console
            res.render('confirm', {                                 //generate template page
                title: 'Submission Status', 
                message: 'Error, submission failed',
                status: error                                       //print error to screen
            });
        });
});
/*
*   Confirm running of application
*/
app.listen(port, function() {                           //verify application is running
    console.log('Example app listening on port 3000');  //log confirmation to console
});

//https://www.youtube.com/watch?v=fPPk4nx2j5U&list=PLCakfctNSHkFj-ba7BfwKv1foU4Wemy87&index=7
