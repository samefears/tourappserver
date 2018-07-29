const mongoose = require('mongoose');

const { Schema } = mongoose;

const TourSchema = new Schema({
  tourName: String,
  tourMembers: [{ type: Schema.Types.ObjectId, ref: 'Band' }],
  shows: [{ type: Schema.Types.ObjectId, ref: 'Show' }],
  tourManagers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tourPass: String,
  bulletins: [{ createdAt: { type: Date, default: Date.now }, message: String }],
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

TourSchema.pre('findById', function() {
  this.populate('shows');
  this.populate('tourMembers');
  this.populate('tourManagers');
  this.populate('admins');
});

module.exports = mongoose.model('Tour', TourSchema);
