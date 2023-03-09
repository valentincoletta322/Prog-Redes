import { JugadorDeLol } from "./JugadorDeLol";
import { Persona } from "./Persona";
import { Genero } from "./Genero";

let unaPersona = new Persona();

console.log(Genero[unaPersona.getGenero()]); //Genero[unaPersona.genero]);

let joakod = new JugadorDeLol();

joakod.mapaDeMains.forEach((value: Number, key: String) =>{
    console.log(key,value);
}); // fat arrow