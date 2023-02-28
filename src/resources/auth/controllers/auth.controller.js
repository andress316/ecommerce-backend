import { awaitCatcher } from 'await-catcher'
import jwt from 'jsonwebtoken'
import environment from '../../../config/environment.js'
import { createUser, findUserByEmail } from '../../users/controllers/users.controller.js'
import validateCreateUserBody from '../../users/validators/users.validators.js'
const { TOKEN_SECRET } = environment

export const login = async ( req, res ) => {
  const { email, password } = req.body
  // Buscamos el usuario en la DB y verificamos si la contraseña es válida
  const [ userFound, userFoundError ] = await awaitCatcher( findUserByEmail( email ) )
  if ( !userFound || userFoundError ) {
    return res.status( 404 ).json( { status: 'ERROR', details: 'user not found' } )
  }
  const [ passwordValid, passwordValidError ] = await awaitCatcher( userFound.validatePassword( password ) )
  if ( !passwordValid || passwordValidError ) {
    return res.status( 404 ).json( { status: 'ERROR', details: 'user not found' } )
  }

  // Generamos el token
  const payload = {
    id: userFound._id,
    fullName: `${ userFound.name } ${ userFound.surname }`,
    email: userFound.email
  }
  const token = jwt.sign( payload, TOKEN_SECRET, {
    expiresIn: "1h"
  } )
  return res.json( { token } )
}

export const signup = async ( req, res ) => {
  const body = req.body
  // Validamos el body
  const [ bodyValidated, validateUserError ] = await awaitCatcher( validateCreateUserBody( body ) )
  if ( !bodyValidated || validateUserError ) {
    return res.status( 400 ).json( { status: 'ERROR', details: validateUserError?.message || 'must provide all fields' } )
  }

  // Creamos el nuevo usuario
  const [ userCreated, userCreatedError ] = await awaitCatcher( createUser( bodyValidated ) )
  if ( !userCreated || userCreatedError ) {
    return res.status( 400 ).json( { status: 'ERROR', details: userCreatedError?.message || 'an error occurred when creating the user' } )
  }
  // Generamos el token
  const payload = {
    id: userCreated._id,
    fullName: `${ userCreated.name } ${ userCreated.surname }`,
    email: userCreated.email
  }
  const token = jwt.sign( payload, TOKEN_SECRET, {
    expiresIn: "1h"
  } )
  return res.status( 201 ).json( { token } )


}


// import { UserModel } from '../../users/models/users.models.js'


// export const auth = async (req, res) => {
//     try{
//         const filter = {
//             email: req.body.email,
//             password: req.body.password,
//             active: true
//         }
//         const u = await UserModel.findOne(filter);
//             if (u){return res.json({msg:"Todo ok", details:"Usuario atenticado"})}
//             else {return res.status(401).json({msg:"Algo salio mal", details:"Usuario no autenticado"})}

//     }
//     catch(error){
//         return res.json({
//             msg: "error en la autenticación",
//             details: error.message
//         })
//     }
// }


