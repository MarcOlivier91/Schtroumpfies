import { Request, Response } from "express";
const bcrypt = require('bcrypt')
const User = require('../model/user')

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  console.log(password)
  const salt = await bcrypt.genSalt(15)
  const hash = await bcrypt.hash(req.body.password, salt)

  try {
    const newUser = new User({
      username,
      email,
      password: hash
    })

    console.log('Request OK')
    await newUser.save()
    console.log(newUser)
    res.status(201).json({
      message: 'SUCCESS : User created.'
    })
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}


const getUsers = async (req: Request, res: Response) => {
  try {
    let users = await User.find()
    users = users.map((user: any) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        joined: user.joined,
      }
    })
    console.log('Request OK')
    res.json(users)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      res.status(404).json({
        message: 'ERROR : Cannot find user.'
      })
    }
    console.log('Request OK')
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      joined: user.joined,
    })
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

const patchUser = async (req: Request, res: Response) => {
  const filter = { _id: req.params.id }
  const update = {
    username: req.body.username,
    email: req.body.email
  }

  try {
    const user = await User.findByIdAndUpdate(filter, update)

    if (!user) {
      res.status(404).json({
        message: 'ERROR : User not found.'
      })
    }
    console.log('Request OK')
    res.status(200).json(update)
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
    console.log('Request OK')
    await User.findOneAndDelete(filter)
    res.status(200).json({ message: 'SUCCESS : User deleted.' })
  } catch (e: any) {
    res.status(500).json(e.message)
  }
}



module.exports = { createUser, getUsers, getUsersById, patchUser, deleteUser }
