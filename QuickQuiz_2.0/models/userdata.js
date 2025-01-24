const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { getCollection } = require('/db');
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  scores: [ { date: { type: Date, default: Date.now }, score: Number } ]

});


UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with the hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
async function getUserById(userId) { 
  const usersCol = getCollection('users'); 
 return usersCol.findOne({ _id: new ObjectId(userId) }); 
}
module.exports = { getUserById };


module.exports = mongoose.model('User', UserSchema);
