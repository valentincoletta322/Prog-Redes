import { Genero } from "./Genero";
import { EstadoCivil } from "./EstadoCivil";

export class Persona{
   private nombre:String;
   private dni:Number;
   private edad:Number;
   private estadoCivil:EstadoCivil;
   private genero:Genero;

    constructor(){
        this.nombre="Juan Perez";
        this.dni=45281182;
        this.edad=19;
        this.estadoCivil=EstadoCivil.CASADO;
        this.genero=Genero.M;
    }

    public getGenero(): Genero{
        return this.genero;
    }

}