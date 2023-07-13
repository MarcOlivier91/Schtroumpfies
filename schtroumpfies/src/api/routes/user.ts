import { Router, Request, Response } from "express";
const router = Router()
const user = require('../model/user')
const userController = require('../controller/userController')

// Getting all users
router.get('/', userController.getUsers)

// Getting one user by id
router.get('/:id', userController.getUsersById)

// Create a new user
router.post('/', userController.createUser)

// Update a user
router.patch('/users/:id', (req: Request, res: Response) => {
  res.send('Later World')
})

// Delete a user
router.delete('/users/:id', (req: Request, res: Response) => {
  res.send('Bye World')
})

module.exports = router;
