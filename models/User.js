const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  facebook: {
    fbid: String,
    email: String,
    accessToken: String,
    name: String,
  },
  google: {
    googleid: String,
    email: String,
    accessToken: String,
    name: String,
  },
  tours: [{ type: Schema.Types.ObjectId, ref: 'Tour' }],
});

UserSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
