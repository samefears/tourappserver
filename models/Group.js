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

GroupSchema.static('populateAll', function(cb) {
  return this.populate([
    { path: 'managers', select: 'firstName lastName email phoneNumber' },
    { path: 'creator', select: 'firstName lastName email phoneNumber' },
    { path: 'crew', select: 'firstName lastName email phoneNumber' },
    { path: 'members', select: 'firstName lastName email phoneNumber' },
    { path: 'managers', select: 'firstName lastName email phoneNumber' }
  ]);
});

// GroupSchema.pre('save', function() {
//   this.populate({ path: 'creator', select: 'firstName lastName email phoneNumber' });
//   this.populate({ path: 'members', select: 'firstName lastName email phoneNumber' });
//   this.populate({ path: 'crew', select: 'firstName lastName email phoneNumber' });
//   this.populate({ path: 'managers', select: 'firstName lastName email phoneNumber' });
// });

// GroupSchema.pre('find', function() {
//   this.populate({ path: 'creator', select: 'firstName lastName email phoneNumber' });
//   this.populate({ path: 'members', select: 'firstName lastName email phoneNumber' });
//   this.populate({ path: 'crew', select: 'firstName lastName email phoneNumber' });
//   this.populate({ path: 'managers', select: 'firstName lastName email phoneNumber' });
// });

module.exports = mongoose.model('Group', GroupSchema);
