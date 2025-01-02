const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  optionDescription: { type: String, required: true },
  votesNumber: { type: Number, default: 0 }
});

const Option = mongoose.model('Option', optionSchema);
module.exports = Option;
