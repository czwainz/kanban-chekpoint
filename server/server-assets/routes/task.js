let router = require('express').Router()
let Comments = require('../models/comment')
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
      next()
    })
})

//POST A COMMENT IN TASK
// router.post('/:taskId/comment', (req, res, next) => {
//   req.body.listId = req.session.uid
//   Tasks.findById(req.params.taskId)
//     .then(task => {
//       let comment = {
//         description: req.body.description,
//         authorId: req.session.uid
//       }
//       task.comments.push(comment)
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

//EDIT A TASK IN A LIST
router.put('/:id', (req, res, next) => {
  Tasks.findById(req.params.id)
    .then(task => {
      task.update(req.body, (err) => {
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

//GET COMMENT BY TASK ID
router.get('/:id/comments', (req, res, next) => {
  Comments.find({ taskId: req.params.id })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})




module.exports = router