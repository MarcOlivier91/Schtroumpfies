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
    // console.log(err.message)
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
  } catch (e) {
    // console.log(e.message)
    res.status(500).send("Error handling request")
  }
}

const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) {
      res.status(404).json({
        message: 'ERROR : User not found.'
      })
    }
    console.log('Request OK')
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      joined: user.joined,
    })
  } catch (e) {
    // console.log(err.message)
    res.status(500).send('Something went wrong...')
  }
}



module.exports = { createUser, getUsers, getUsersById }
