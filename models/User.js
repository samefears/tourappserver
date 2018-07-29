const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  tours: [{ type: Schema.Types.ObjectId, ref: 'Tour' }]
});

module.exports = mongoose.model('User', UserSchema);
