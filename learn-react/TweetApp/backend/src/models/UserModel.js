const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  mobileNumber: { type: String, required: false },
  role:{type: String, required: false, default: 'user'}
  // Add other fields as needed
});



module.exports = mongoose.model('UserColl', userSchema);
