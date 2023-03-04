import { Router } from 'express'
import { createBrand, getBrands, getBrandById, updateBrandById, deleteBrandById } from '../controllers/brand.cotrollers.js'

const brandsRouter = Router()

const baseURI = '/'


brandsRouter.post( baseURI, createBrand )
brandsRouter.get( baseURI, getBrands )
brandsRouter.get( `${ baseURI }/:id`, getBrandById )
brandsRouter.put( `${ baseURI }/:id`, updateBrandById )
brandsRouter.delete( `${ baseURI }/:id`, deleteBrandById )

export default brandsRouter





