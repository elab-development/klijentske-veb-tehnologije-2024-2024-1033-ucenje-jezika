- isntalling json server locally so we can simulate
  working with database
npm install -g json-server

- starting the server
json-server --watch ./data/db.json

- if error occurs:
https://www.sharepointdiary.com/2014/03/fix-for-powershell-script-cannot-be-loaded-because-running-scripts-is-disabled-on-this-system.html

- after running server, we run the app
npm start 
- and we pick option Y so it will give us new port (3001)