import { Router, Request, Response } from "express";
const router = Router()
const User = require('../model/user')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userController = require('../controller/userController')

/* User's Authentication */
router.post('/login', (req: Request, res: Response, next:any) => {
  try {
    User.findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Incorrect username or password' })
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            console.log(valid)
            if (!valid) {
              return res.status(401).json({ message: 'Incorrect username or passowrd' })
            }
            res.status(200).json({
              id: user.id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET'
              )
            })
          })
      })
  } catch (e: any) {
    console.log(e.message)
    res.status(500).json(e.message)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('jwt')
})

// Getting all users
router.get('/', userController.getUsers)

// Getting one user by id
router.get('/:id', userController.getUsersById)

// Register a new user
router.post('/signup', userController.createUser)

// Update a user
router.patch('/:id', userController.patchUser)

// Delete a user
router.delete('/:id', userController.deleteUser)

module.exports = router;
