import { Vacuna } from './Vacuna';
import { Persona } from './Persona';
import express from 'express'; 
import { Aplicacion } from './Aplicacion';
import swaggerUi = require('swagger-ui-express');
import swaggerSetup from './swagger'

const app: express.Application = express(); 

const port = 3000;

app.use(express.json());

app.use("/documentation",swaggerUi.serve, swaggerUi.setup(swaggerSetup))

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
    const vacunaNueva = new Vacuna(_req.body.id, _req.body.descripcion, _req.body.fabricantes, _req.body.tipo, _req.body.dosisRequeridas);
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
    vacuna.setDescripcion = _req.body.descripcion;
    vacuna.setFabricantes = _req.body.fabricantes;
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

        if (_req.body.fabricantes) {
          vacuna.setFabricantes = _req.body.fabricantes
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

app.delete('/vacunas/:id', (_req, _res) => {
  const vacuna = vacunas.find(item => {
    return item.getId == Number(_req.params.id);
  });

  if (vacuna) {
    vacunas.splice(vacunas.indexOf(vacuna), 1);
  }
  
  return _res.status(204).send();
});


/* Personas */

app.get("/personas", (_req,_res) => {
  _res.json(personas);
})

app.post("/personas", (_req, _res) => {
  if (personas.find(persona => persona.getDni === _req.body.dni)) {
    _res.status(400).json({ error: `Ya hay una persona con el dni ${_req.body.dni}` });
  } else {
    const personaNueva = new Persona(_req.body.dni, _req.body.nombre,_req.body.apellido,_req.body.fecha_nacimiento,_req.body.sexo);
    personas.push(personaNueva);
    _res.json(personaNueva);
  }
});

app.delete("/personas/:dni", (_req,_res) => {
  const persona = personas.find(item => {
      return item.getDni == Number(_req.params.dni);
  })
  if (persona){
    delete personas[personas.indexOf(persona)]
    _res.status(204).send();
  }
  _res.status(404).send();
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

app.put("/personas/:dni", (_req,_res) => {
  const persona = personas.find(item => {
      return item.getDni == Number(_req.params.dni)
  })
  if (!persona){
      _res.status(404).send() 
  } else {  
    persona.setNombre = _req.body.nombre;
    persona.setApellido = _req.body.apellido;
    persona.setSexo = _req.body.tipo;
    persona.setAplicaciones = _req.body.aplicaiones;
    }
  _res.status(204).send()
})

/* Otros métodos */

app.get("/personas/:dni/aplicaciones",(_req,_res) => {
  const persona = personas.find(item => {
    return item.getDni == Number(_req.params.dni)
    })
    if (persona){
      _res.json(persona.getAplicaciones);
    }
    _res.status(404).send();
})


app.post("/personas/:dni/aplicaciones",(_req,_res) => {
  const persona = personas.find(item => {
    return item.getDni == Number(_req.params.dni)
    })
    if (persona){
    persona.agregarAplicacion(new Aplicacion(_req.body.fechaDeAplicacion,_req.body.vacunaAplicada,_req.body.dosis,_req.body.fabricante))
    _res.json(persona);  
  }
  _res.status(404).send()
})

/* app.delete("/personas/:dni/aplicaciones",(_req,_res) => {
  const persona = personas.find(item => {
    return item.getDni == Number(_req.params.dni)
    })
    if (persona){
    persona.agregarAplicacion(new Aplicacion(_req.body.fechaDeAplicacion,_req.body.vacunaAplicada,_req.body.dosis,_req.body.fabricante))
    }
  _res.json(persona);
}) */

app.get("/vacunas/porFabricante/:fabricante", (_req, _res) => {
  const vacunasFiltradas = vacunas.filter(v => v.getFabricantes.includes(_req.params.fabricante));
  
  if (vacunasFiltradas.length === 0) {
    _res.status(404).send(`No se encontraron vacunas del fabricante '${_req.params.fabricante}'`);
    return;
  }

  _res.json(vacunasFiltradas);
});

app.get('/personas/dosisFaltantes/:id', (_req, _res) => {
  let personasFaltantes:Array<Persona> = new Array<Persona>
  
  const vacuna = vacunas.find(v => v.getId == Number(_req.params.id));
  
  if (!vacuna) {
    _res.status(404).send(`Vacuna '${_req.params.id}' no encontrada`);
    return;
  }

  personas.forEach(persona => {
    const aplicaciones = persona.getAplicaciones.filter(a => a.getVacunaAplicada === vacuna.getId);
    const dosisAplicadas = aplicaciones.length;
    
    if (dosisAplicadas < Number(vacuna.getDosisRequeridas)) {
      let dosisFaltantes = Number(vacuna.getDosisRequeridas) - dosisAplicadas
      personasFaltantes.push(persona);
    }
  });

  _res.send(personasFaltantes);
});




/* Otros */

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));
