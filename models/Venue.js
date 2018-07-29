const mongoose = require('mongoose');

const { Schema } = mongoose;

const VenueSchema = new Schema({
  name: String,
  capacity: Number,
  notes: String,
  address: {
    streetNumber: String,
    streetName: String,
    city: String,
    region: String,
    country: String,
    phoneNumber: String
  },
  showers: {
    available: Boolean,
    details: String
  },

  pointsOfInterest: [
    {
      name: String,
      address: {
        streetNumber: String,
        streetName: String,
        city: String,
        region: String,
        country: String,
        phoneNumber: String
      },
      category: String
    }
  ]
});

module.exports = mongoose.model('Venue', VenueSchema);
