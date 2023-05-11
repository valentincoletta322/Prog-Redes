import jwt from "jsonwebtoken";

const claveSecreta = "Jabubu"

export function generarClave(username: String): string{
    let sign = {
        "username": username
    }
    let firma = jwt.sign(sign, claveSecreta);

    return firma;
}

export function verificarClave(req: any, res: any, next: any){
    const clave = req.headers.authorization;

    if (!clave) {
        return res.status(401).send('Unauthorized: No token provided.');
    }

    try {
        jwt.verify(clave, claveSecreta);
        console.log("Verificación exitosa");
        next();
    }
    catch (err) {
        return res.status(401).send('Unauthorized: Invalid token.');
    }
}