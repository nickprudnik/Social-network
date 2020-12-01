const mongoose = require('mongoose')
const Schema = mongoose.Schema
const privatePaths = require('mongoose-private-paths')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    private: true
  },
  dateOfBirth: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  phoneNumber: {
    type: String 
  },
  gender: {
    type: String
  },
  userImage: {
    type: String
  },
  avatarUrl: {
    type: String
  }
})

userSchema.plugin(privatePaths)

module.exports = mongoose.model('users', userSchema)
