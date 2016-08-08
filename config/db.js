const mysql = require('mysql');
console.log('env ', process.env.JAWSDB_URL)
const connection = "<heroku></heroku>mysql://b6z2u1u1y93lmuhz:yreqj5gb910e9onj@gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ot0kl0n8jukkvhbz" || mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MY_USER,
  password: process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DATABASE
})


connection.connect();

module.exports = connection;