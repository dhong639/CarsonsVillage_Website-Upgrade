Purpose:
Create graphical user interface from which to insert data into the User_Account table of the database

Required: 
* NodeJS v6.14.12
  * Express
  * pg
  * body-parser
  * pug
* PostgreSQL v13.2

Installation:
  npm install express
  npm install pg
  npm install body-parser
  npm install pug

Run Command: 
 node server.js
 (perform from directory containing server.js)
  
Other Notes: 
* Ensure that PostgreSQL server is running
* Ensure that all files are placed in same directory

Bugs: 
* Any error in submission, regardless of relation to the database, will trigger the error page
* All database insert errors only report the first noted error
* Links on confirmation do not work
