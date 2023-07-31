import { Request, Response } from "express";
const bcrypt = require('bcrypt')
const User = require('../model/user')

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  // Checking if form completed
  if (!username || !email || !password ) {
    res.status(400)
  }
  const salt = await bcrypt.genSalt(15)
  const hash = await bcrypt.hash(req.body.password, salt)

  try {
    const newUser = new User({
      username,
      email,
      password: hash
    })

    await newUser.save()
    console.log(newUser)
    res.status(201).json({

      message: 'SUCCESS : User created.'
    })
    console.log('Request OK')

  } catch (e: any) {
    console.log(e)
    res.status(500).send(e.message)
  }
}

const getUsers = async (req: Request, res: Response) => {
  try {
    let users = await User.find()
    users = users.map((user: any) => {
      return {
        _id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        joined: user.joined
      }
    })
    res.json(users)
    console.log('Request OK')
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

const getUsersById = async (req: Request, res: Response) => {
  const { _id } = req.params

  try {
    const user = await User.findById(_id)

    if (!user) {
      res.status(404).json({
        message: 'ERROR : Cannot find user.'
      })
    }
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      joined: user.joined,
      role: user.role
    })
    console.log('Request OK')
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

const patchUser = async (req: Request, res: Response) => {
  const salt = await bcrypt.genSalt(15)
  const hash = await bcrypt.hash(req.body.password, salt)
  const filter = { _id: req.params.id }
  const update = {
    username: req.body.username,
    email: req.body.email,
    password: hash,
    role: req.body.role
  }

  try {
    const user = await User.findByIdAndUpdate(filter, update)

    if (!user) {
      res.status(404).json({
        message: 'ERROR : User not found.'
      })
    }
    res.status(200).json(update)
    console.log('Request OK')
  } catch (e: any) {
    console.log(e.message)
    res.status(500).json(e.message)
  }
}


const deleteUser = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id }

  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: 'ERROR : User not found.'
      })
    }
    await User.findOneAndDelete(filter)
    res.status(200).json({ message: 'SUCCESS : User deleted.' })
    console.log('Request OK')
  } catch (e: any) {
    res.status(500).json(e.message)
  }
}



module.exports = { createUser, getUsers, getUsersById, patchUser, deleteUser }
