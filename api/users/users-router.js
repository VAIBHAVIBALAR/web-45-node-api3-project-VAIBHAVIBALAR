const express = require('express');
const { validateUserId, validateUser,validatePost } = require('../middleware/middleware')
const User = require('./users-model')
const Post = require('../posts/posts-model')

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    next(error)
  })
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    next(error)
  })
});

router.delete('/:id', validateUserId, (req, res, next) => {
  User.remove(req.params.id)
  .then(() => {
    res.status(200).json(req.user)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  User.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    next(error)
  })
});

router.post('/:id/posts',validateUserId, validatePost, (req, res, next) => {
  const postInfo = {...req.body, user_id: req.params.id}

  Post.insert(postInfo)
  .then(posts => {
    res.status(210).json(posts)
  })
  .catch(error => {
    next(error)
  })
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: 'Something wrong'
  })
})

module.exports = router