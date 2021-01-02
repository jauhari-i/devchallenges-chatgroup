import User from '../../models/User'
import { check } from 'express-validator'

export const loginCheck = [
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email is invalid'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty'),
]

export const registerCheck = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty'),
  check('email').custom(val => {
    if (!val) {
      return Promise.reject('Email cannot be empty')
    }
    return User.findOne({ email: val }).then(u => {
      if (u) {
        return Promise.reject('User with this email already exist')
      }
    })
  }),
  check('username').custom(val => {
    if (!val) {
      return Promise.reject('Username cannot be empty')
    }
    return User.findOne({ username: val }).then(u => {
      if (u) {
        return Promise.reject('Username already used')
      }
    })
  }),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty'),
  check('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('Please confirm your password!'),
]
