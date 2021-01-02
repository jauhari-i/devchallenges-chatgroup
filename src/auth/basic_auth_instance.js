import express from 'express'
import basicAuth from 'express-basic-auth'
import { getConfig } from '../config/global_config'

const app = express()
const basicAuthInstance = getConfig('/basicAuthApi')

app.use(
  basicAuth({
    authorizer: (username, password) => {
      const userMatches = basicAuth.safeCompare(
        username,
        basicAuthInstance.username
      )
      const passwordMatches = basicAuth.safeCompare(
        password,
        basicAuthInstance.password
      )
      return userMatches & passwordMatches
    },
    challenge: true,
  })
)

export { app }
