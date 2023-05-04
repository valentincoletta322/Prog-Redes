import { Vacuna } from './src/clases/Vacuna';
import { Persona } from './src/clases/Persona';
import express from 'express'; 
//import {  } from './mongos/prueba';
import { Aplicacion } from './src/clases/Aplicacion';
import swaggerUi = require('swagger-ui-express');
import swaggerSetup from './swagger'
import { routerVacunas } from './src/routes/routesVacunas';
import { routerPersonas } from './src/routes/routesPersonas';
import { routerUsuarios } from './src/routes/routesUsuarios';

const app: express.Application = express(); 

const port = 3000;

app.use(express.json());

app.use(routerVacunas);
app.use(routerUsuarios);
app.use(routerPersonas);

app.use("/documentation",swaggerUi.serve, swaggerUi.setup(swaggerSetup))

export let personas:Array<Persona> = new Array<Persona>
export let vacunas:Array<Vacuna> = new Array<Vacuna>

//run();

app.get('/', (_req , _res) => _res.send('Bienvenido a mi API REST!'));

/* Users */

app.use("/register", routerUsuarios);

app.use("/login", routerUsuarios);

app.use("/current", routerUsuarios);

 /* Vacunas */ 

app.use("/vacunas", routerVacunas);

app.use("/vacunas/:id", routerVacunas);

app.use("/vacunas", routerVacunas);

app.use("/vacunas/:id", routerVacunas);

/* Personas */

app.use("/personas", routerPersonas);

app.use("/personas/:dni", routerPersonas);

/* Otros métodos */

app.use("/personas/:dni/aplicaciones", routerPersonas)

app.use("/vacunas/fabricante/:fabricante", routerVacunas);

app.use('/vacunas/:id/dosisFaltantes', routerVacunas);



/* Otros */

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));
