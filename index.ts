import { Vacuna } from './Vacuna';
import { Persona } from './Persona';
import express from 'express'; 
import { Aplicacion } from './Aplicacion';

const app: express.Application = express(); 

const port = 3000;

app.use(express.json());

class product{
    id: number;
    name: string;

    constructor(_id: number, _name: string){
       this.id=_id;
       this.name=_name;     
    }
}

let products:Array<product> = new Array<product>
let vacunas:Array<Vacuna> = new Array<Vacuna>
let personas:Array<Persona> = new Array<Persona>

app.get('/', (_req , _res) => _res.send('Bienvenido a mi API REST!'));

 /* Vacunas */

app.get("/vacunas", (_req,_res) => {
  _res.json(vacunas);
})

app.post("/vacunas", (_req,_res) => {
  const vacunaNueva = new Vacuna(_req.body.id, _req.body.descripcion,_req.body.fabricante,_req.body.tipo,_req.body.dosisRequeridas);
  vacunas.push(vacunaNueva);
  _res.json(vacunaNueva);   
})
/* Personas */

app.get("/personas", (_req,_res) => {
  _res.json(personas);
})

app.post("/personas", (_req,_res) => {
  const personaNueva = new Persona(_req.body.dni, _req.body.nombre,_req.body.apellido,_req.body.fecha_nacimiento,_req.body.sexo);
  personas.push(personaNueva);
  _res.json(personaNueva);   
})

app.get("/personas/:dni", (_req,_res) => {
  _res.json(personas.find(item => {
                return item.getDni == Number(_req.params.dni)
            }));
})

app.delete("/personas/:dni", (_req,_res) => {
  const persona = personas.find(item => {
      return item.getDni == Number(_req.params.dni)
  })
  if (persona){
    delete personas[personas.indexOf(persona)]
  }
  _res.status(204).send()
})

app.put("/personas/:dni", (_req,_res) => {
  const persona = personas.find(item => {
                return item.getDni == Number(_req.params.dni)
            })
  if (persona){
    persona.setNombre = _req.body.name;
    persona.setApellido = _req.body.apellido;
    persona.setNacimiento = _req.body.nacimiento;
    persona.setSexo = _req.body.nacimiento;
    persona.setAplicaciones = _req.body.aplicaciones;
  }
  _res.json(persona);   
})

/* Agregar aplicacion */

app.post("/persona/:dni/aplicaciones",(_req,_res) => {
  const persona = personas.find(item => {
    return item.getDni == Number(_req.params.dni)
    })
    if (persona){
    persona.agregarAplicacion(new Aplicacion(_req.body.fechaDeAplicacion,_req.body.vacunaAplicada,_req.body.dosis))
    }
  _res.json(persona);
})  
/* Otros */

app.get("/products/:id", (_req,_res) => {
  _res.json(products.find(item => {
                return item.id == Number(_req.params.id)
            }));

})

app.delete("/products/:id", (_req,_res) => {
  const p = products.find(item => {
      return item.id == Number(_req.params.id)
  })
  if (p){
    delete products[products.indexOf(p)]
  }
  _res.status(204).send()
})

app.put("/products/:id", (_req,_res) => {
  const p = products.find(item => {
                return item.id == Number(_req.params.id)
            })
  if (p){
    p.name = _req.body.name
  }
  _res.json(p);   
})

app.patch("/products/:id", (_req,_res) => {
    //   
})

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));