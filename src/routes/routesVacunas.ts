import { Router } from "express";
import { Vacuna } from '../clases/Vacuna';
import { Persona } from "../clases/Persona";
import { personas } from "../..";
import { vacunas } from "../..";
import { deleteVacuna, findVacuna, findVacunas, insertVacunas, updateVacuna } from "../mongos/vacunasMongo";

export const routerVacunas = Router();


routerVacunas.get('/vacunas', async (_req,_res) => {
    const vacunitas = await findVacunas();
    _res.json(vacunitas);
});

routerVacunas.get("/vacunas/:id", async (_req,_res) => {
  const vacuna = await findVacuna(Number(_req.params.id));
  if (!vacuna){
    _res.status(404).send;
  }
  _res.json(vacuna)
})

routerVacunas.post("/vacunas", async (_req, _res) => {
  if (await findVacuna(_req.body.id)) {
    _res.status(400).json({ error: `Ya hay una vacuna con id ${_req.body.id}` });
  } else {
    const vacuna = new Vacuna(_req.body.id, _req.body.descripcion,_req.body.fabricantes,_req.body.tipo,_req.body.dosisRequeridas);
    await insertVacunas(vacuna);
    _res.json(vacuna);
  }
  });

  routerVacunas.put("/vacunas/:id", async (_req,_res) => {
    const vacuna = await findVacuna(Number(_req.params.id))
    if (!vacuna){
      _res.status(404).send;
    } else {  
      vacuna.setDescripcion = _req.body.descripcion;
      vacuna.setFabricantes = _req.body.fabricantes;
      vacuna.setTipo = _req.body.tipo;
      vacuna.setDosisRequeridas = _req.body.dosisRequeridas;
      await updateVacuna(vacuna);  
    }
    _res.status(204).send()
  })

  routerVacunas.patch('/vacunas/:id', async (_req, _res) => {
    const vacuna = await findVacuna(Number(_req.params.id))
    if (!vacuna){
      _res.status(404).send;
    }else{
      if (_req.body.descripcion) {
        vacuna.setDescripcion=_req.body.descripcion;
      }
      if (_req.body.tipo) {
        vacuna.setTipo=_req.body.tipo;
      }
      if (_req.body.fabricantes) {
        vacuna.setFabricantes=_req.body.fabricantes;
      }
      if (_req.body.dosisRequeridas) {
        vacuna.setDosisRequeridas=_req.body.dosisRequeridas;
      }
      await updateVacuna(vacuna);
    }
    return _res.status(204).send();
  });

  routerVacunas.delete('/vacunas/:id', async (_req, _res) => {
    const id = Number(_req.params.id);
    const result = await deleteVacuna(id);
    _res.status(result).send();
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

