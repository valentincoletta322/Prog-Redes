import { Router, Request, Response} from "express";
import { Vacuna } from '../clases/Vacuna';
import { Persona } from "../clases/Persona";
import { Aplicacion } from "../clases/Aplicacion";
import { personas } from "../..";
import { vacunas } from "../..";
import { StatusCodes } from "http-status-codes";
import { deletePersona, findPersona, findPersonas } from "../mongos/personasMongo";

export const routerPersonas = Router();


routerPersonas.get("/personas", async (_req,_res) => {
    const result = await findPersonas();
    _res.json(result);
  })
  
  routerPersonas.post("/personas", (_req, _res) => {
    if (personas.find(persona => persona.getDni === _req.body.dni)) {
      _res.status(400).json({ error: `Ya hay una persona con el dni ${_req.body.dni}` });
    } else {
      const personaNueva = new Persona(_req.body.dni, _req.body.nombre,_req.body.apellido,_req.body.fecha_nacimiento,_req.body.sexo);
      personas.push(personaNueva);
      _res.json(personaNueva);
    }
  });
  
  routerPersonas.delete('/personas/:dni', async (_req, _res) => {
    const dni = Number(_req.params.dni);
    const result = await deletePersona(dni);
    _res.status(result).send();
  });
  
  routerPersonas.patch('/personas/:dni', (_req, _res) => {
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
  
  routerPersonas.put("/personas/:dni", (_req,_res) => {
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
  
  routerPersonas.get("/personas/:dni/aplicaciones",(_req,_res) => {
    const persona = personas.find(item => {
      return item.getDni == Number(_req.params.dni)
      })
      if (persona){
        _res.json(persona.getAplicaciones);
      }
      _res.status(404).send();
  })
  
  
  routerPersonas.post("/personas/:dni/aplicaciones",(_req,_res) => {
    const persona = personas.find(item => {
      return item.getDni == Number(_req.params.dni)
      })
      if (persona){
      persona.agregarAplicacion(new Aplicacion(_req.body.fechaDeAplicacion,_req.body.vacunaAplicada,_req.body.dosis,_req.body.fabricante))
      _res.json(persona);  
    }
    _res.status(404).send()
  })