const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'Username is a required field']
  },
  email: {
    type: String,
    required: [true, 'Email is a required field'],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is a required field'],
    minLength: 8
  },
  role: {
    type: String,
    enum: ['Guerrier', 'Alchimiste', 'Sorcier', 'Espions', 'Enchanteur'],
  },
  creationDate: {
    
  }
})

module.exports = mongoose.model('User', userSchema)
