These are test scripts of the PostgreSQL database server using NodeJS with a simple REST API.

**To set this up on your PC:**
1. Add these files to your PC
2. Run the commands:

  a. npm install
  
  b. SET DEBUG=nodejs-posgresql:* & npm start
 3. Use URL: http://localhost:3000/, http://localhost:3000/quotes(http://localhost:3000/quotes?page=1), http://localhost:3000/quotes?page=2

Note 1: If you want to view the datbase entries in a readable way when you GET, a simple way is to install the Chrome Extension JSON Viewer.
Note 2: If you do POST operation, a simple way to verify that it has been successfully added to the database is by doing the GET operation(just run the server and view the URL).

The tutorial used to implement this was: https://medium.com/dailyjs/node-js-postgresql-tutorial-7a19d945767f

**If you wish to implement this on your own with the tutorial:**

Note 1: When you are setting up Express, if doing the command: cd nodejs-posgresql && npm install && DEBUG=nodejs-posgresql:* npm start doesn't work for you, then run the following commands in order:
1. cd nodejs-posgresql
2. npm install
3. SET DEBUG=nodejs-posgresql:* & npm start

Note 2: If the command rm -rf public doesn't work for you, then just manually delete the public folder.

Note 3: Make sure you are not creating a new app.js when you are linking up the quotes route. Modify the existing app.js that was created in the beginning.

Note 4: Use SET DEBUG=nodejs-posgresql:* & npm start command to run the server if you had to split the three commands as mentioned in an earlier note.

Note 5: You can curl in a new terminal(i.e. Git Bash) while the server is running to create a new quote or use Postman.

Note 6: If you use Postman, if you are having trouble adding your files or adding the localhost url in the new Workspace you created in the online version, download the Postman Desktop and simply add the URL http://localhost:3000/quotes in the a Workspace and do GET or POST. Specifially, to POST, click the Body section, and then add id, quote, and author for the key section and whatever value you want them to have in the value section and click SEND or hit Enter.
