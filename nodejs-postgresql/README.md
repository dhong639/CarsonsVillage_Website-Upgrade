These are test scripts of the PostgreSQL database server using NodeJS with a simple REST API.

The tutorial used to implement this was: https://medium.com/dailyjs/node-js-postgresql-tutorial-7a19d945767f

**If you wish to implement this on your own with the tutorial:**

Note 1: When you are setting up Express, if doing the command: cd nodejs-posgresql && npm install && DEBUG=nodejs-posgresql:* npm start doesn't work for you, then do:
1. cd nodejs-posgresql
2. npm install
3. SET DEBUG=nodejs-posgresql:* & npm start

Note 2: If the command rm -rf public doesn't work for you, then just manually delete the public folder.

Note 3: Make sure you are not creating a new app.js when you are linking up the quotes route. Modify the existing app.js that was created in the beginning.

Note 4: Use SET DEBUG=nodejs-posgresql:* & npm start command to run the server if you had to split the three commands as mentioned in an earlier note.

Note 5: You can curl in a new terminal(i.e. Git Bash) while the server is running to create a new quote or use Postman.

Note 6: If you use Postman, if you are having trouble adding your files or adding the localhost url in the new Workspace you created in the online version, download the Postman Desktop and simply add the URL http://localhost:3000/quotes in the a Workspace and do GET or POST. Specifially, to POST, click the Body section, and then add id, quote, and author for the key section and whatever value you want them to have in the value section and click SEND or hit Enter.
