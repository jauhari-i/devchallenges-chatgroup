import User from '../../models/User'
import bcryptjs from 'bcryptjs'
import { generateToken } from '../../auth/jwt_auth_instance'

const loginInstance = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw {
        error: true,
        statusCode: 404,
        message: 'User with this email not exist',
      }
    } else {
      const isMatchPassword = await bcryptjs.compare(password, user.password)
      if (!isMatchPassword) {
        throw {
          error: true,
          statusCode: 400,
          message: 'User Password is not match',
        }
      } else {
        const payload = {
          sub: user.userId,
          email: user.email,
        }

        const token = await generateToken(payload)

        if (token) {
          const updateLastLogin = await User.findByIdAndUpdate(user._id, {
            lastLogin: Date.now(),
          })
          if (!updateLastLogin)
            throw {
              error: true,
              statusCode: 500,
              message: 'Internal Server Error, Failed to update users',
            }
          return {
            error: false,
            statusCode: 200,
            message: 'Login Success!',
            data: {
              accessToken: token,
            },
          }
        } else {
          throw {
            error: true,
            statusCode: 500,
            message: 'Internal Server Error, Failed to generate token',
          }
        }
      }
    }
  } catch (e) {
    return e
  }
}

export default loginInstance
