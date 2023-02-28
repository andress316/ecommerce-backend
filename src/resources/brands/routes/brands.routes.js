// const getBrands = (req, res) =>{
//     res.send("BRANDS")
// }

// export default getBrands;

import { Router } from 'express'
import { createBrand, getBrands, getBrandById, updateBrandById, deleteBrandById } from '../controllers/brand.cotrollers.js'

// Definimos la instancia de nuestro express router
const brandsRouter = Router()

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
*/
brandsRouter.post( baseURI, createBrand )
brandsRouter.get( baseURI, getBrands )
brandsRouter.get( `${ baseURI }/:id`, getBrandById )
brandsRouter.put( `${ baseURI }/:id`, updateBrandById )
brandsRouter.delete( `${ baseURI }/:id`, deleteBrandById )

export default brandsRouter





