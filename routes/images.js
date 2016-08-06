const express = require('express');

const router = express.Router();

//ROUTES
const Image = require('../models/image')

//Imgae (title case singular ---> model
//image lowercase singular ----> one image object 
//images lowercase plural ----> array of image objects

router.get('/', (req, res) => {
  Image.getAll()
    .then(images => {
      res.send(images)
    })
    .catch(err => {
      res.status(400).send(err)
    });
});

router.post('/', (req, res) => {
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

router.delete('/:id' , (req, res) => {
  
  Image.delete(req.params.id)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err)
    });
});

router.put('/:id', (req, res) => {
  Image.update(req.params.id, req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err)
    });
});

router.get('/:id', (req, res) => {
  Image.getOne(req.params.id)
  .then(image => {
    res.send(image)
  })
  .catch(err => {
    res.status(400).send(err)
  });
});
module.exports = router