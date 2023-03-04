import { Router } from 'express'
import { login, signup } from '../controllers/auth.controller.js'

const authRouter = Router()

const baseURI = '/auth'

authRouter.post( `${ baseURI }/login`, login )
authRouter.post( `${ baseURI }/signup`, signup )


export default authRouter
