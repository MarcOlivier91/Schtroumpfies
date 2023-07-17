import { Router, Request, Response } from "express";
const router = Router()
const user = require('../model/user')
const auth = require('../middleware/authentication')
const userController = require('../controller/userController')

// Getting all users
router.get('/', userController.getUsers)

// Getting one user by id
router.get('/:id', userController.getUsersById)

// Create a new user
router.post('/', userController.createUser)

// Update a user
router.patch('/:id', userController.patchUser)

// Delete a user
router.delete('/:id', userController.deleteUser)

module.exports = router;
