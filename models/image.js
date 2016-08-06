//Image model
const squel = require('squel').useFlavour('mysql');
const connection = require('../config/db');

const uuid = require('uuid')
const momeent = require('moment')
//Initialize the table 

connection.query(`create table if not exists images (
    id varchar(50),
    url varchar(100),
    title varchar(100),
    description varchar(500),
    createdAt timestamp
  )`, err => {
    if (err) throw err;
  });

exports.getAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('images').toString();
    connection.query(sql, (err, images) => {
      if (err) resolve(err)
      else resolve(images)
    });
  });
}

exports.create =  function(newImage) {
  return new Promise((resolve, reject) => {
    let sql = squel.insert()
                  .into('images')
                  .setFields(newImage)
                  .set('id', uuid.v4())
                  .set('createdAt', moment().format('YYYY/MM/DD HH:mm:ss'))
                  .toString();
    connection.query(sql, err => {
      if(err) reject(err)
      else resolve()
    });
  });
}

//// LATER
// Image.getAll.then()....