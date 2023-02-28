import express from 'express';
import { startConnection } from './config/database.config.js';
import environment from './config/environment.js';
import productsRouter from './resources/products/routes/products.routes.js';
import ordersRouter from './resources/orders/routes/orders.routes.js';
import usersRouter from './resources/users/routes/users.routes.js';
import brandsRouter from './resources/brands/routes/brands.routes.js';
import authRouter from './resources/auth/routes/auth.routes.js';
import cors from 'cors';


// Se crea una instancia de una aplicación express
const app = express();

// Iniciamos la conexión a la base de datos
startConnection()
app.use(cors())

// Se configura un middleware para aceptar requests de tipo JSON
app.use( express.json() )

// Se agrega una ruta (endpoint) por defecto
app.get( '/', function ( req, res ) {
 res.json( { message: "hola mundo" } );
} );

// Se agrega el endpoint de products
app.use( '/products', productsRouter )
app.use( ordersRouter )
app.use( '/brands', brandsRouter )
app.use( usersRouter )
app.use( authRouter )




// Se inicia la aplicación y se queda escuchando requests
console.log( `APLICATION INICIARÁ EN EL PUERTO: ${ environment.PORT }` )
app.listen( environment.PORT );