const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupSchema = new Schema({
  groupName: String,
  details: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  crew: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  managers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Group', GroupSchema);
