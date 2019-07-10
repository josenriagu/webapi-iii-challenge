// import express module
const express = require('express');
// import database helper
const Posts = require('./postDb');
// define router
const router = express.Router();

router.get('/', async (req, res) => {
   try {
      const posts = await Posts.get();
      res.status(200).json({ success: true, posts })
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' })
   }
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;