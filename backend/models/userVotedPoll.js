const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userVotedPollSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  timestamp: { type: Date, default: Date.now }
});

const UserVotedPoll = mongoose.model('UserVotedPoll', userVotedPollSchema);
module.exports = UserVotedPoll;
