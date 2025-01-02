const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
  optionId: { type: Schema.Types.ObjectId, ref: "Option", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
});

const Vote = mongoose.model("Vote", voteSchema);
module.exports = Vote;
