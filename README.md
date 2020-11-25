<h1 align="center">Backend For Zwallet!</h1>
<p>This is the dependency of <a href="https://github.com/tavvfiq/zwallet-app">Zwallet App</a>. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js.</p> 
<a href="https://en.wikipedia.org/wiki/Express.js">More about expressJS</a>

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.11.x-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost with XAMPP or LAMPP)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp or lampp, etc.
5. Create a database with the name note, and Import file [backend-express.sql](https://github.com/tavvfiq/zwallet-backend/blob/master/src/sql/zwallet_new.sql) to **phpmyadmin**
6. run the server with `npm run server`
7. Open Postman desktop application or Chrome web app extension that has installed before
8. Choose HTTP Method and enter request url.(ex. localhost:3000/)
9. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
HOST="your_host_name"
USERNAME= "your_mysql_username"
PASSWORD= "your_mysql_password"
DB= "your_database_name"
PORT=your_port //default 3000

SOCKET_PORT=your_socket_port //default 8000

API_URL="your_api_url"
EMAIL="your_email"
EMAIL_TOKEN='your_email_token'
SECRET_KEY = "your_secret_key"
RESET_PASSWORD_KEY = "your_reset_password_key";
```

## Postman Documentation
You can grab the Postman documentation [here](https://documenter.getpostman.com/view/12186383/TVmFk1K8) 
