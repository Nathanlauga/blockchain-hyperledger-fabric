const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  passwordToken: {
    type: String,
    default: null,
  },
  passwordTokenExpire: {
    type: Date,
    default: null,
  },
}, {
    timestamps: true,
  });

/**
* @constructs
*
* Password hashing before save the client in database
*/

userSchema.pre('save', async function (next) {
  try {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    // hash the password using our new salt
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

/**
 * @method
 *
 * Compare password when user try to login
 */

userSchema.methods.comparePassword = async function (candidatePassword, cb) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return cb(null, isMatch);
  } catch (err) {
    return cb(err);
  }
};

userSchema.index({ createdAt: -1 });
userSchema.index({ createdAt: 1 });


module.exports = mongoose.model('users', userSchema);
