const mongoose = require('mongoose');

const { Schema } = mongoose;

const BandSchema = new Schema({
  bandName: String,
  details: String,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  crew: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tourManager: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

BandSchema.pre('findById', function() {
  this.populate('members');
  this.crew('members');
  this.tourManager('members');
});

BandSchema.pre('findByIdAndUpdate', function() {
  this.populate('members');
  this.crew('members');
  this.tourManager('members');
});

module.exports = mongoose.model('Band', BandSchema);
