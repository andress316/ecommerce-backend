import mongoose from 'mongoose'


const brandSchema = new mongoose.Schema( {
  nombre: {
    type: String,
    required: true,
    unique: true,
},
image: {
    type: String,
    
}
})

export const BrandModel = new mongoose.model( 'Brand', brandSchema )