

import { BrandModel } from "../models/brand.model.js"
  
export const createBrand = async ( req, res ) => {
    const body = req.body
    const newBrand = await BrandModel.create( body )
    res.json( newBrand )
  }

export const getBrands = async ( req, res ) => {
    const brands = await BrandModel.find()   
    res.json( brands )
}

export const getBrandById = async ( req, res ) => {
  const id = req.param.id
  const brand = await BrandModel.findById( id )
  res.json( brand )
}

export const updateBrandById = async ( req, res ) => {
  const body = req.body
  const id = req.param.id
  const brandUpdated = await BrandModel.findByIdAndUpdate( id, body, { new: true } )
  res.json( brandUpdated )
}

export const deleteBrandById = async ( req, res ) => {
  const id = req.param.id
  const brandRemoved = await BrandModel.findByIdAndDelete( id )
  res.json( brandRemoved )
}