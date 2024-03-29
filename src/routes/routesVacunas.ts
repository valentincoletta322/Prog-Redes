import { Router } from "express";
import { Vacuna } from '../clases/Vacuna';
import { Persona } from "../clases/Persona";
import { deleteVacuna, findVacuna, findVacunas, insertVacunas, updateVacuna } from "../mongos/vacunasMongo";
import { findPersonas } from "../mongos/personasMongo";
import { verificarClave } from "../verificacion";

export const routerVacunas = Router();


routerVacunas.get('/vacunas', verificarClave, async (_req,_res) => {
    const vacunasMongo = await findVacunas();
    _res.json(vacunasMongo);
});

routerVacunas.get("/vacunas/:id", verificarClave, async (_req,_res) => {
  const vacuna = await findVacuna(Number(_req.params.id));
  if (!vacuna){
    _res.status(404).send;
  }
  _res.json(vacuna)
})

routerVacunas.post("/vacunas", verificarClave, async (_req, _res) => {
  if (await findVacuna(_req.body.id)) {
    _res.status(400).json({ error: `Ya hay una vacuna con id ${_req.body.id}` });
  } else {
    const vacuna = new Vacuna(_req.body.id, _req.body.descripcion,_req.body.fabricantes,_req.body.tipo,_req.body.dosisRequeridas);
    await insertVacunas(vacuna);
    _res.json(vacuna);
  }
  });

  routerVacunas.put("/vacunas/:id", verificarClave, async (_req,_res) => {
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

  routerVacunas.patch('/vacunas/:id', verificarClave, async (_req, _res) => {
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

  routerVacunas.delete('/vacunas/:id', verificarClave, async (_req, _res) => {
    const id = Number(_req.params.id);
    const result = await deleteVacuna(id);
    _res.status(result).send();
  });
  
  routerVacunas.get('/vacunas/:id/dosisFaltantes', verificarClave, async (_req, _res) => {
    let personasFaltantes:Array<Persona> = new Array<Persona>
    
    const vacuna = await findVacuna(Number(_req.params.id));
    if (!vacuna){
      _res.status(404).send;
    }
    
    else{
      let personasMongo:Array<Persona> = await findPersonas();
      personasMongo.forEach(persona => {
        const aplicaciones = persona.getAplicaciones.filter(a => a.getVacunaAplicada === vacuna.getId);
        const dosisAplicadas = aplicaciones.length;
        
        if (dosisAplicadas < Number(vacuna.getDosisRequeridas)) {
          let dosisFaltantes = Number(vacuna.getDosisRequeridas) - dosisAplicadas
          personasFaltantes.push(persona);
        }
      })
    }
    _res.send(personasFaltantes);
  });

  routerVacunas.get("/vacunas/fabricante/:fabricante", verificarClave, async (_req, _res) => {
    let vacunasMong:Array<Vacuna> = await findVacunas(); 
    const vacunasFiltradas = vacunasMong.filter(v => v.getFabricantes.includes(_req.params.fabricante));
    
    if (vacunasFiltradas.length === 0) {
      _res.status(404).send(`No se encontraron vacunas del fabricante '${_req.params.fabricante}'`);
      return;
    }
  
    _res.json(vacunasFiltradas);
  });

