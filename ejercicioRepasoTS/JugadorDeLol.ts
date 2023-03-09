import { Persona } from "./Persona";

export class JugadorDeLol extends Persona{
    mapaDeMains: Map<String,Number>; //% pickrate,nombre;
    constructor(){
        super();
        this.mapaDeMains = new Map<String,Number>;
        this.mapaDeMains.set("Kled",95);
        this.mapaDeMains.set("Dr.Mundo",5);   
    }
}