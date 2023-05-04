import { Router } from "express";
import { Usuario } from "../clases/Usuario";
import { findUsuario, insertUsuario } from "../mongos/usuariosMongo";
import { createHash } from 'node:crypto'

function sha256(content: string) {
    return createHash('sha256').update(content).digest('hex')
}

export const routerUsuarios = Router();

routerUsuarios.post('/register', async (_req,_res) => {
    if (await findUsuario(_req.body.username)) {
        _res.status(400).json({ error: `Ya hay un usuario con el username ${_req.body.username}` });
      } else {
        const usuarioNuevo = new Usuario(_req.body.username, sha256(_req.body.password));
        await insertUsuario(usuarioNuevo);
        _res.json(usuarioNuevo);
      }
});

routerUsuarios.post('/login', async (_req,_res) => {
    const vacuna = await findUsuario(_req.body.username);
    if (!vacuna){
      _res.status(404).send();
    }
    else if (vacuna.getPassword == sha256(_req.body.password)){
        _res.status(200).send('Logged');
    }
    else _res.status(200).send('Wrong.');
});

routerUsuarios.get('/current', (_req,_res) => {
    console.log("current info");
    _res.status(200).send();
});