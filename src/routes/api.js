import { Router } from 'express'
import controllers from '../controllers'
import { app as basicAuth } from '../auth/basic_auth_instance'

import { loginCheck, registerCheck } from '../helpers/validators/validateAuth'

const AuthController = controllers.AuthController

const router = Router()

router.get('/', (req, res) => {
  res.send('Api endpoint')
})

router.post('/login', [basicAuth, loginCheck], AuthController.loginFunction)
router.post(
  '/register',
  [basicAuth, registerCheck],
  AuthController.registerFunction
)

export { router }
