import { Vacuna } from './Vacuna';
import { Persona } from './Persona';
import express from 'express'; 
import { Aplicacion } from './Aplicacion';
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('.swagger.yaml');

const app: express.Application = express(); 

const port = 3000;

app.use(express.json());

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.get("/vacunas/:id", (_req,_res) => {
  _res.json(vacunas.find(item => {
                return item.getId == Number(_req.params.id)
            }));
})

app.post("/vacunas", (_req, _res) => {
  if (vacunas.find(vacuna => vacuna.getId == Number(_req.body.id))) {
    _res.status(400).json({ error: `Ya hay una vacuna con id ${_req.body.id}` });
  } else {
    const vacunaNueva = new Vacuna(_req.body.id, _req.body.descripcion, _req.body.fabricante, _req.body.tipo, _req.body.dosisRequeridas);
    vacunas.push(vacunaNueva);
    _res.json(vacunaNueva);   
  }
});

app.put("/vacunas/:id", (_req,_res) => {
  const vacuna = vacunas.find(item => {
      return item.getId == Number(_req.params.id)
  })
  if (!vacuna){
      _res.status(404).send() 
  } else {  
    let index = vacunas.indexOf(vacuna);
    vacuna.setDescripcion = _req.body.descripcion;
    vacuna.setFabricante = _req.body.fabricante;
    vacuna.setTipo = _req.body.tipo;
    vacuna.setDosisRequeridas = _req.body.dosisRequeridas;
    }
  _res.status(204).send()
})

app.patch("/vacunas/:id", (_req, _res) => {
  const vacuna = vacunas.find(item => {
    return item.getId == Number(_req.params.id)
  })

    if (!vacuna) {
      _res.status(404).send()
    } else{ 
        if (_req.body.descripcion) {
          vacuna.setDescripcion = _req.body.descripcion
        }

        if (_req.body.fabricante) {
          vacuna.setFabricante = _req.body.fabricante
        }

        if (_req.body.tipo) {
          vacuna.setTipo = _req.body.tipo
        }

        if (_req.body.dosisRequeridas) {
          vacuna.setDosisRequeridas = _req.body.dosisRequeridas
        }
      }  
  return _res.status(204).send()
})

app.get("/vacunas/:fabricante", (_req,_res) => {
  _res.json(vacunas.filter(item => item.getFabricante == String(_req.params.fabricante)));
})

/* Personas */

app.get("/personas", (_req,_res) => {
  _res.json(personas);
})

app.post("/personas", (_req, _res) => {
  if (personas.find(persona => persona.getDni === _req.body.dni)) {
    _res.status(400).json({ error: `Ya hay una persona con ese dni ${_req.body.dni}` });
  } else {
    const personaNueva = new Persona(_req.body.dni, _req.body.nombre,_req.body.apellido,_req.body.fecha_nacimiento,_req.body.sexo);
    personas.push(personaNueva);
    _res.json(personaNueva);
  }
});

app.delete("/personas/:dni", (_req,_res) => {
  const persona = personas.find(item => {
      return item.getDni == Number(_req.params.dni)
  })
  if (persona){
    delete personas[personas.indexOf(persona)]
  }
  _res.status(204).send()
})

app.patch('/personas/:dni', (_req, _res) => {
  const dni = Number(_req.params.dni);
  const persona = personas.find(p => p.getDni == Number(dni));

  if (!persona) {
    return _res.status(404).send();
  } else{
    if (_req.body.nombre) {
      persona.setNombre=_req.body.nombre;
    }
    if (_req.body.apellido) {
      persona.setApellido=_req.body.apellido;
    }
    if (_req.body.fecha_nacimiento) {
      persona.setNacimiento=_req.body.fecha_nacimiento;
    }
    if (_req.body.sexo) {
      persona.setSexo=_req.body.sexo;
    }
  }
  return _res.status(204).send();
});

/* Agregar aplicacion */

app.post("/personas/:dni/aplicaciones",(_req,_res) => {
  const persona = personas.find(item => {
    return item.getDni == Number(_req.params.dni)
    })
    if (persona){
    persona.agregarAplicacion(new Aplicacion(_req.body.fechaDeAplicacion,_req.body.vacunaAplicada,_req.body.dosis))
    }
  _res.json(persona);
})  

/* Otros */

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));