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

router.get('/:id', validatePostId, (req, res) => {
   try {
      res.status(200).json(req.post);
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' })
   }
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

async function validatePostId(req, res, next) {
   let { id } = req.params;
   id = Number(id);
   if (Number.isInteger(id)) {
      req.valid = true;
      const post = await Posts.getById(id)
      if (post) {
         req.post = post;
         next();
      } else {
         res.status(404).json({ message: 'the post with that id has gone to Mars!' });
      }
   } else {
      res.set('X-Nasty', 'Nasty ID').status(400).json({ message: "that does not look like an id!!" });
   }
};

module.exports = router;