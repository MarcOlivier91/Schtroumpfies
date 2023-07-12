const bcrypt = require('bcrypt')
const User = require('../model/User')

const createUser = async (req: Request, res: Response) => {
  const {username, email, password } = req.body
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
    res.status(201).json({
      message: 'SUCCESS : User created.'
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

module.exports = {createUser}
