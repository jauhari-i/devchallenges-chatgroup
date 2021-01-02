import services from '../../services'
import { handleError } from '../../helpers/error'
import { validationResult } from 'express-validator'

const { LoginInstance, RegisterInstance } = services

const controller = {
  loginFunction: async (req, res) => {
    const validationError = validationResult(req)
    if (validationError.errors.length) {
      handleError(
        {
          statusCode: 400,
          message: 'Input error',
          errors: validationError.errors,
        },
        res
      )
    } else {
      const { email, password } = req.body
      const query = await LoginInstance({ email, password })
      if (query.error) {
        handleError(query, res)
      } else {
        res.status(query.statusCode).json(query)
      }
    }
  },
  registerFunction: async (req, res) => {
    const validationError = validationResult(req)
    if (validationError.errors.length) {
      handleError(
        {
          statusCode: 400,
          message: 'Input error',
          errors: validationError.errors,
        },
        res
      )
    } else {
      const { name, username, email, password, confirmPassword } = req.body
      if (password !== confirmPassword) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Password confirmation not match',
        })
      } else {
        const query = await RegisterInstance({
          name,
          username,
          email,
          password,
        })
        if (query.error) {
          handleError(query, res)
        } else {
          res.status(query.statusCode).json(query)
        }
      }
    }
  },
}

export { controller }
