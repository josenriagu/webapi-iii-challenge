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

router.delete('/:id', validatePostId, async (req, res) => {
   try {
      await Posts.remove(req.params.id);
      const posts = await Posts.get();
      res.status(200).json({ success: true, posts })
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' })
   }
});

router.put('/:id', validatePostId, validatePost, async (req, res) => {
   try {
      await Posts.update(req.post.id, req.body)
      const posts = await Posts.get();
      res.status(200).json({ success: true, posts })
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' })
   }
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

function validatePost(req, res, next) {
   if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      if (req.body.text) {
         next();
      } else {
         res.status(400).json({ message: "missing required text field" })
      }
   } else {
      res.status(400).json({ message: "missing post data" })
   }
};

module.exports = router;