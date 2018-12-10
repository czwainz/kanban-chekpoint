let router = require('express').Router()
let Comments = require('../models/comment')


//POST A COMMENT IN A TASK
router.post('/', (req, res, next) => {
  req.body.taskId = req.session.uid
  Comments.create(req.body)
    .then(newComment => {
      res.send(newComment)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//EDIT A COMMENT IN A TASK
router.put('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      comment.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE A COMMENT IN A TASK
router.delete('/:id', (req, res, next) => {
  Comments.findById(req.params.id)
    .then(comment => {
      comment.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      });
    })
})


module.exports = router
