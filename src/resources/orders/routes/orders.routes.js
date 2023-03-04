import { Router } from 'express'
import { verifyToken } from '../../auth/middlewares/auth.midlewares.js'
import { createOrder } from '../controllers/orders.controller.js'

const ordersRouter = Router()

const baseURI = '/orders'

ordersRouter.post( baseURI, verifyToken, createOrder )



export default ordersRouter






