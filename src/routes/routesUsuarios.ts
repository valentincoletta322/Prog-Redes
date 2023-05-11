import { Router } from "express";
import { Usuario } from "../clases/Usuario";
import { findUsuario, insertUsuario } from "../mongos/usuariosMongo";
import { createHash } from 'node:crypto'
import { JsonObject } from "swagger-ui-express";
import { generarClave } from "../verificacion";

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
        let respuesta: JsonObject = JSON.parse(JSON.stringify(usuarioNuevo));
        respuesta["claveJWT"] = generarClave(_req.body.username);
        _res.json(respuesta);
      }
});

routerUsuarios.post('/login', async (_req,_res) => {
    const user = await findUsuario(_req.body.username);
    if (user && user.getPassword == sha256(_req.body.password)){
        let respuesta: JsonObject = JSON.parse(JSON.stringify(user));
        respuesta["claveJWT"] = generarClave(_req.body.username);
        _res.json(respuesta);
    }
    else _res.status(200).send('Wrong.');
});

routerUsuarios.get('/current', (_req,_res) => {
    console.log("current info");
    _res.status(200).send();
});