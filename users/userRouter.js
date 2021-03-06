// import express module
const express = require('express');
// import database helper
const Users = require('./userDb');
const Posts = require('../posts/postDb');
// define router
const router = express.Router();

router.post('/', validateUser, async (req, res) => {
   try {
      const user = await Users.insert(req.body)
      res.status(201).json(user)
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' })
   }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
   try {
      await Posts.insert({ text: req.body.text, user_id: req.user.id })
      const posts = await Users.getUserPosts(req.user.id);
      res.status(201).json({ success: true, posts })
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' })
   }
});

router.get('/', async (req, res) => {
   try {
      const users = await Users.get();
      res.status(200).json({ success: true, users })
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' })
   }
});

router.get('/:id', validateUserId, (req, res) => {
   try {
      res.status(200).json(req.user);
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' });
   }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
   try {
      const posts = await Users.getUserPosts(req.user.id);
      res.status(200).json({ success: true, posts })
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' });
   }
});

router.delete('/:id', validateUserId, async (req, res) => {
   try {
      await Users.remove(req.params.id);
      const users = await Users.get();
      res.status(200).json({ success: true, users })
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' });
   }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
   try {
      await Users.update(req.user.id, req.body)
      const users = await Users.get();
      res.status(200).json({ success: true, users })
   } catch (error) {
      res.status(500).json({ message: 'Oops, something went wrong' });
   }
});

//custom middleware

async function validateUserId(req, res, next) {
   let { id } = req.params;
   id = Number(id);
   if (Number.isInteger(id)) {
      req.valid = true;
      const user = await Users.getById(id)
      if (user) {
         req.user = user;
         next();
      } else {
         res.status(404).json({ message: 'the user with that id has gone to Mars!' });
      }
   } else {
      res.set('X-Nasty', 'Nasty ID').status(400).json({ message: "that does not look like an id!!" });
   }
};

function validateUser(req, res, next) {
   if (Object.keys(req.body).length !== 0 && req.body.constructor === Object) {
      if (req.body.name) {
         next();
      } else {
         res.status(400).json({ message: "missing required name field" })
      }
   } else {
      res.status(400).json({ message: "missing user data" })
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
