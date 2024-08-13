const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: { type: String, required: true },
  description: { type : String},
  options: [
    {
      option: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  endDate: { type: Date, default: null },
  status: {type: Boolean, default: true}
});
//hhnhnjnjnj
const Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
