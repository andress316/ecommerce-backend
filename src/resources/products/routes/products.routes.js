import { Router } from 'express'
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/products.controller.js'
import { verifyToken } from '../../auth/middlewares/auth.midlewares.js'

// Definimos la instancia de nuestro express router
const productsRouter = Router()

// Se define la base de la URI para exponet el servicio
const baseURI = '/'

/* 
  Se configura según el estandar REST los verbos HTTP 
  a vincular para realizar las operaciones CRUD. 
  Los handlers de cada verbo HTTP se deben construir en el controller
  y luego agregarlos aca.

  VERBO HTTP              CRUD          Controller handler
     POST      --------> CREATE --------> createProduct
     GET       --------> READ   --------> getProducts / getProductById
     PUT/PATCH --------> UPDATE --------> updateProductById
     DELETE    --------> DELETE --------> deleteProductById

     verifyToken
*/
productsRouter.post( baseURI, verifyToken, createProduct )
productsRouter.get( baseURI, getProducts )
productsRouter.get( `${ baseURI }/:id`, getProductById )
productsRouter.put( `${ baseURI }/:id`,verifyToken, updateProductById )
productsRouter.delete( `${ baseURI }/:id`,verifyToken, deleteProductById )


export default productsRouter