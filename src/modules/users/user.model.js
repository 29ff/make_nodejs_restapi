import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

import { passwordReg } from './user.validations';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import constants from '../../config/constants';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [ true, 'Email is required!' ],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!'
    },
  },
  firstName: {
    type: String,
    required: [ true, 'Firstname is required!' ],
    trim: true
  },
  lastName: {
    type: String,
    required: [ true, 'Lastname is required!' ],
    trim: true
  },
  userName: {
    type: String,
    required: [ true, 'Username is required!' ],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [ true, 'Password is required!' ],
    trim: true,
    minlength: [ 6, 'Password need to be longer!' ],
    validate: {
      validator(password) {
        passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!'
    }
  }
});

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenicateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: this.createToken(),
    };
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
    };
  },
}

export default mongoose.model('User', UserSchema);