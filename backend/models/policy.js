const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  creationDate: { type: Date, default: Date.now },
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;
