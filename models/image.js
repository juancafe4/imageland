"use strict";

//Image model
const squel = require('squel').useFlavour('mysql');
const connection = require('../config/db');

const uuid = require('uuid')
const moment = require('moment')
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
      if (err) reject(err)
      else resolve(images)
    });
  });
}

exports.getOne = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                  .from('images')
                  .where(`id = "${id}"`)
                  .toString();
    connection.query(sql, (err, images) => {
      let image = images[0]
      if (err) reject(err)
      else if(!image) reject("Error: image not found!")
      else resolve(image)
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
      console.log(err)
      if(err) reject(err)
      else resolve()
    });
  });
}

exports.delete = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
                  .from('images')
                  .where(`id = "${id}"`)
                  .toString()
    connection.query(sql, err => {
      if(err) reject(err)
      else resolve()
    });
  });
}

exports.update = function(id, updateObj) {
  delete updateObj.id;
  delete updateObj.createdAt;
  return new Promise((resolve, reject) => {
    let sql = squel.update()
                .table('images')
                .setFields(updateObj)
                .where(`id = "${id}"`)
                .toString();
    connection.query(sql, (err, result) => {
      // console.log(err)
      //console.log('update args ', b, c, d, e);
      if (!result.affectedRows)
        reject(err)
      else if(err) reject(err)
      else resolve()
    });
  });
}


//// LATER
// Image.getAll.then()....