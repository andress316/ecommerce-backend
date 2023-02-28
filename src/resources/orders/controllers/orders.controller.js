import { awaitCatcher } from 'await-catcher'
import mercadopago from 'mercadopago'
import environment from '../../../config/environment.js'
import { OrderModel } from '../models/orders.model.js'

mercadopago.configure( {
  access_token: environment.TOKEN_MERCADO_PAGO
} )
export const createOrder = async ( req, res ) => {
  const user = req.user
  const productsIds = req.body.products.map( product => product._id )
  const body = {
    products: productsIds,
    user: user.id
  }
  const [ orderCreated, orderCreatedError ] = await awaitCatcher( OrderModel.create( body ) )
  if ( !orderCreated || orderCreatedError ) {
    const errorResponse = {
      status: 'FAILED',
      details: orderCreatedError?.message || 'Ha ocurrido un error al procesar la solicitud'
    }
    return res.status( 400 ).json( errorResponse )
  }

  const items = req.body.products.map( product => {
    return { title: product.name, unit_price: parseInt( product.price ), quantity: product.quantity }
  } )

  const [ preferenceId, preferenceIdError ] = await awaitCatcher( mercadopago.preferences.create( { payer: { name: user.fullName, email: user.email }, items } ) )
  if ( !preferenceId || preferenceIdError ) {
    const errorResponse = {
      status: 'FAILED',
      details: preferenceIdError?.message || 'Ha ocurrido un error al procesar la orden'
    }
    return res.status( 400 ).json( errorResponse )
  }

  return res.status( 201 ).json( { preferenceId } )
}