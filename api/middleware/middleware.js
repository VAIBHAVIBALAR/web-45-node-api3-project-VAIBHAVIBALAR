const User = require('../users/users-model')
const Post = require('../posts/posts-model')

function logger(req, res, next) {
  console.log('It is being called')
  console.log(`it is a  request`)
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params
  User.getById(id)
  .then(match => {
    if(match) {
      req.user = match
      next()
    } else {
      next({ status: 404, message: "user not found"})
    }
  })
  .catch(next)
}

function validateUser(req, res, next) {
 if (!req.body.name){
   next({ status: 400, message: "missing required name field"})
 } else {
   next()
 }

}

function validatePost(req, res, next) {
  if (!req.body.text){
    next({ status: 400, message: "missing required text field"})
  } else {
    next()
  }
}

module.exports = {logger, validateUserId, validateUser, validatePost}