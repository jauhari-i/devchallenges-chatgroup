import User from '../../models/User'
import bcryptjs from 'bcryptjs'
import { v4 as uuid } from 'uuid'

const registerInstance = async ({ name, username, email, password }) => {
  try {
    const encryptedPassword = await bcryptjs.hash(password, 10)
    if (!encryptedPassword) {
      throw {
        error: true,
        statusCode: 500,
        message: 'Internal server error, Failed to secure password',
      }
    } else {
      const newUser = await User.create({
        userId: uuid(),
        name,
        username,
        email,
        password: encryptedPassword,
      })
      if (!newUser) {
        throw {
          error: true,
          statusCode: 500,
          message: 'Internal server error, Failed to register user',
        }
      } else {
        return {
          error: false,
          statusCode: 201,
          message: 'Register User Success!',
          data: {
            userId: newUser.userId,
            name: newUser.name,
            email: newUser.email,
            username: newUser.username,
          },
        }
      }
    }
  } catch (e) {
    console.log(e)
    return e
  }
}

export default registerInstance
