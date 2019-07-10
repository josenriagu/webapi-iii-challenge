// import express module
const express = require('express');
// import database helper
const Users = require('./userDb');
// define router
const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', async (req, res) => {
   try {
      const users = await Users.get();
      res.status(200).json({success: true, users})
   } catch (error) {
      res.status(500).json({message: 'Oops, something went wrong'})
   }
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
