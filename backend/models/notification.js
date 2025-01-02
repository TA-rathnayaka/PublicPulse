const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  sentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['sent', 'read'], default: 'sent' }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
