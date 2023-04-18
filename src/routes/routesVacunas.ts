import { Router } from "express";
import { Vacuna } from '../clases/Vacuna';
import { Persona } from "../clases/Persona";
import { personas } from "../..";
import { vacunas } from "../..";

export const routerVacunas = Router();


routerVacunas.get('/vacunas', (_req,_res) => {
    _res.json(vacunas);
});

routerVacunas.get("/vacunas/:id", (_req,_res) => {
    _res.json(vacunas.find(item => {
                  return item.getId == Number(_req.params.id)
              }));
})

routerVacunas.post("/vacunas", (_req, _res) => {
    if (vacunas.find(vacuna => vacuna.getId == Number(_req.body.id))) {
      _res.status(400).json({ error: `Ya hay una vacuna con id ${_req.body.id}` });
    } else {
      const vacunaNueva = new Vacuna(_req.body.id, _req.body.descripcion, _req.body.fabricantes, _req.body.tipo, _req.body.dosisRequeridas);
      vacunas.push(vacunaNueva);
      _res.json(vacunaNueva);   
    }
  });

  routerVacunas.put("/vacunas/:id", (_req,_res) => {
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

  routerVacunas.put("/vacunas/:id", (_req,_res) => {
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

  routerVacunas.delete('/vacunas/:id', (_req, _res) => {
    const vacuna = vacunas.find(item => {
      return item.getId == Number(_req.params.id);
    });
  
    if (vacuna) {
      vacunas.splice(vacunas.indexOf(vacuna), 1);
    }
    
    return _res.status(204).send();
  });
  
  routerVacunas.get('/vacunas/:id/dosisFaltantes', (_req, _res) => {
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

  routerVacunas.get("/vacunas/fabricante/:fabricante", (_req, _res) => {
    const vacunasFiltradas = vacunas.filter(v => v.getFabricantes.includes(_req.params.fabricante));
    
    if (vacunasFiltradas.length === 0) {
      _res.status(404).send(`No se encontraron vacunas del fabricante '${_req.params.fabricante}'`);
      return;
    }
  
    _res.json(vacunasFiltradas);
  });