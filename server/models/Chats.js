const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  messages: [
    {
      text: {
        type: String,
        required: true
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      createdDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const populationFields = 'messages.user';

chatSchema.post('save', async (doc) => {
  await doc.populate(populationFields).execPopulate();
});

function populateFields () {
  this.populate(populationFields);
}

chatSchema.pre('find', populateFields);
chatSchema.pre('findOne', populateFields);
chatSchema.pre('findOneAndUpdate', populateFields);

module.exports = mongoose.model('chats', chatSchema);
