import { Router } from 'express'
import { verifyToken } from '../../auth/middlewares/auth.midlewares.js'
import { getProfile } from '../controllers/users.controller.js'

const usersRouter = Router()

const baseURI = '/users'

usersRouter.get( `${ baseURI }/profile`, verifyToken, getProfile )

export default usersRouter