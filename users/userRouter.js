// import express module
const express = require('express');
// import database helper
const Users = require('./userDb');
// define router
const router = express.Router();
// tell router what to use
// router.use(validateUserId);

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

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

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

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
         res.status(404).json({ message: 'user with that id has gone to Mars!' });
      }
   } else {
      res.set('X-Nasty', 'Nasty ID').status(400).json({ message: "that does not look like an id!!" });
   }
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
