import { Vacuna } from './Vacuna';
import { Persona } from './Persona';
import express from 'express'; 
import { Aplicacion } from './Aplicacion';
import swaggerUi = require('swagger-ui-express');
import swaggerSetup from './swagger'
import { routerVacunas } from './routes/routesVacunas';
import { routerPersonas } from './routes/routesPersonas';

const app: express.Application = express(); 

const port = 3000;

app.use(express.json());

app.use("/documentation",swaggerUi.serve, swaggerUi.setup(swaggerSetup))

export let personas:Array<Persona> = new Array<Persona>
export let vacunas:Array<Vacuna> = new Array<Vacuna>

app.get('/', (_req , _res) => _res.send('Bienvenido a mi API REST!'));

 /* Vacunas */

app.use("/vacunas", routerVacunas)

app.use("/vacunas/:id", routerVacunas)

app.use("/vacunas", routerVacunas);

app.put("/vacunas/:id", routerVacunas)

app.patch("/vacunas/:id", routerVacunas)

app.delete('/vacunas/:id', routerVacunas);


/* Personas */

app.get("/personas", routerPersonas)

app.post("/personas", routerPersonas);

app.delete("/personas/:dni", routerPersonas)

app.patch('/personas/:dni', routerPersonas);

app.put("/personas/:dni", routerPersonas)

/* Otros métodos */

app.get("/personas/:dni/aplicaciones", routerPersonas)


app.post("/personas/:dni/aplicaciones",routerPersonas)

/* app.delete("/personas/:dni/aplicaciones",(_req,_res) => {
  const persona = personas.find(item => {
    return item.getDni == Number(_req.params.dni)
    })
    if (persona){
    persona.agregarAplicacion(new Aplicacion(_req.body.fechaDeAplicacion,_req.body.vacunaAplicada,_req.body.dosis,_req.body.fabricante))
    }
  _res.json(persona);
}) */

app.get("/vacunas/fabricante/:fabricante", routerVacunas);

app.get('/vacunas/:id/dosisFaltantes', routerVacunas);



/* Otros */

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));
