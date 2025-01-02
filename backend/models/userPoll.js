const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPollSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  timestamp: { type: Date, default: Date.now }
});

const UserPoll = mongoose.model('UserPoll', userPollSchema);
module.exports = UserPoll;