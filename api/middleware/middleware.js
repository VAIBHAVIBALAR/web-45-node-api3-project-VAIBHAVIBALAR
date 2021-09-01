const User = require('../users/users-model')

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
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId}