let router = require('express').Router()
let Tasks = require('../models/task')


//POST A TASK IN A LIST
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  // req.body.listId = req.params.listId
  Tasks.create(req.body)
    .then(newTask => {
      res.send(newTask)
    })
    .catch(err => {
      console.log(err)
      res.status(400).send(err)
      return
      next()
    })
})



//POST A COMMENT IN TASK
// router.post('/:taskId/comments', (req, res, next) => {
//   Tasks.findById(req.params.taskId)
//     .then(task => {
//       req.body.authorId = req.session.uid
//       task.comments.push(req.body)
//       task.save(err => {
//         if (err) {
//           return next(err)
//         }
//         res.send("Successfully add comment")
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       next()
//     })
// })

//EDIT A TASK IN A LIST -- ALL COMMENTS ARE PUT REQUESTS
router.put('/:id/create-comment', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      req.body.authorId = req.session.uid
      task.comments.push(req.body)
      task.save(error => {
        if (error) {
          console.log(error)
          res.send({ message: "error" })
        }
        res.send(task)
      })
    });
})

//DELETE A TASK IN A LIST
router.delete('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      task.remove(err => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted")
      });
    })
})

// DELETE A COMMENT BY TASK ID
router.put('/:taskId/delete-comment/:commentId', (req, res, next) => {
  Tasks.findById(req.params.taskId)
    .then(task => {
      task.update(req.body, (err) => {

        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Deleted Comment")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})



module.exports = router