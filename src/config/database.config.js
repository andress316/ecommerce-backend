import mongoose from 'mongoose';
import environment from './environment.js';

mongoose.set( 'strictQuery', false );

const mongoDbURI = environment.DB_URI

export const startConnection = () => {
  mongoose.connect( mongoDbURI ).then( () => console.log( 'Conexión correcta' ) ).catch( error => console.error( error ) )
}

const db = mongoose.connection
export default db