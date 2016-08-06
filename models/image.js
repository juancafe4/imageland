//Image model
const squel = require('squel');
const connection = require('../config/db');


//Initialize the table 

connection.query(`create table if not exists images (
    id varchar(50),
    url varchar(100),
    title varchar(100),
    desc varchar(500),
    createdAt timestamp
  )`, err => {
    if (err) throw err;
  });


