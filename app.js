//Initialize enirioment variables
require('dotenv').config();
const express = require ('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser')
const app = express();
//Port
const port = process.env.PORT | 8000

//MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static('public'));


//Routes
app.use('/images', require('./routes/images'))

//Server listen
app.listen(port), err => {
  console.log(err || `Listenning at ${port}`);
}