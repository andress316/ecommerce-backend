import mongoose from 'mongoose'

/* 
Se define el esquema de mongoose, esta corresponde a la estructura de lo que sería un producto
El id es generado automáticamente
*/
const productSchema = new mongoose.Schema( {
  name:{
    type: String,
    maxLength: 100,
    required: true,
    unique: true,
},
description: {
    type: String,
    maxLength: 300,
    required: true,
},
count: {
    type: Number,
    required: true,
},
price:{
    type: Number,
    required: true,

},
brand:{
    type: String,
    required: true,

},
image: {
    type: String,
    default: '/images/ibanez.jpg',
}
}, {
  timestamps: true,
})
productSchema.index({name: "text", descripcion: "text"}, {name: "TextIndex"})

// Se crea la instancia del modelo.
export const ProductModel = new mongoose.model( 'Product', productSchema )