//Initialize enirioment variables
require('dotenv').config();
const express = require ('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser')
const Image = require('./models/image')
const app = express();
//Port
const port = process.env.PORT | 8000

//MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static('public'));

//ROUTES

app.get('/images', (req, res) => {
  Image.getAll()
    .then(images => {
      res.send(images)
    })
    .catch(err => {
      res.status(400).send(err)
    });
});

app.post('/images', (req, res) => {
  // req.body
  // {
  //   title:
  //   url:
  //   description:
  // }
  Image.create(req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err)
    });
});
//Server listen
app.listen(port), err => {
  console.log(err || `Listenning at ${port}`);
}