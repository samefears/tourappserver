const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShowSchema = new Schema({
  bands: [{ type: Schema.Types.ObjectId, ref: 'Band' }],
  busCall: Date,
  capacity: Number,
  carSharing: Boolean,
  cityName: String,
  curfew: Date,
  date: Date,
  loadInTime: Date,
  preSaleNumbers: Number,
  profit: Number,
  updatedAt: { type: Date, default: Date.now },
  vipInfo: String,
  venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
  wifi: {
    network: String,
    password: String
  },
  hotel: {
    streetNumber: String,
    streetName: String,
    city: String,
    region: String,
    country: String,
    phoneNumber: String
  },
  guestList: {
    cap: Number,
    band: {
      name: String,
      guest: [String]
    }
  },
  catering: {
    menu: String,
    location: String,
    time: Date
  },
  greenRoom: {
    available: Boolean,
    details: String
  },
  dayRoom: {
    available: Boolean,
    details: String
  },
  promoterDetails: {
    phone: String,
    email: String
  }
});

ShowSchema.pre('findById', function() {
  this.populate('band');
});

module.exports = mongoose.model('Show', ShowSchema);
