const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    type: Date
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
});

module.exports = mongoose.model('users', userSchema);
