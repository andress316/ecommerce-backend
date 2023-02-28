import { UserModel } from '../models/users.models.js'

export const createUser = async ( body ) => {
  const newProduct = await UserModel.create( body )
  return newProduct
}

export const findUserByEmail = async ( email ) => {
  const userFound = await UserModel.findOne( { email: email } )
  return userFound
}

export const getProfile = async ( req, res ) => {
  const user = req.user
  return res.json( user )
}

