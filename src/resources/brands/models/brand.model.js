import mongoose from 'mongoose'

/* 
Se define el esquema de mongoose, esta corresponde a la estructura de lo que sería un producto
El id es generado automáticamente
*/
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

// Se crea la instancia del modelo.
export const BrandModel = new mongoose.model( 'Brand', brandSchema )