const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  commentText: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
