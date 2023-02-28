import joi from 'joi'

const createProductSchemaValidator = joi.object( {
  name: joi.string().max( 100 ).required(),
  description: joi.string().max( 300 ).required(),
  count: joi.number().integer().required(),
  price: joi.number().required(),
  brand: joi.string().max( 100 ).required(),
  image: joi.string()
  
} )

const validateCreateProductBody = async ( body ) => {
  return createProductSchemaValidator.validateAsync( body, { abortEarly: false } )
}

export default validateCreateProductBody