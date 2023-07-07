const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
  },
  mobileNo: {
    type: String,
    required: [true, 'Mobile Number is required'],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Mobile Number must be a 10-digit number',
    },
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format',
    },
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  qualification: {
    type: String,
    enum: ['10th', '12th', 'Graduation'],
    required: [true, 'Qualification is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    validate: {
      validator: function (v) {
        return mongoose.models.User.findOne({ username: v }).exec().then((user) => !user);
      },
      message: 'Username already exists',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

userSchema.path('mobileNo').validate(async function (value) {
  const user = await mongoose.models.User.findOne({ mobileNo: value });
  return !user;
}, 'Mobile Number already exists');

userSchema.path('email').validate(async function (value) {
  const user = await mongoose.models.User.findOne({ email: value });
  return !user;
}, 'Email already exists');


const User = mongoose.model('User', userSchema);

module.exports = User;
