import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";  
import { Aplicacion } from "../clases/Aplicacion";
import { Persona } from "../clases/Persona";

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/Vacunacion";

const client = new MongoClient(url)


export async function findPersonas() {


        const database = client.db('Vacunacion');

        const usuarios = database.collection('Pacientes');

        // Query for a movie that has the title 'Back to the Future'

        // const query = { dni: dni };

        const cursor = usuarios.find();
        const documentos = await cursor.toArray();
        const personasArray = documentos.map((doc: { nombre: String; apellido: String; dni: Number; fecha_nacimiento: Date; sexo:String; aplicaciones:Array<Aplicacion> }) => new Persona(doc.dni, doc.nombre, doc.apellido, doc.fecha_nacimiento, doc.sexo).setAplicaciones=doc.aplicaciones);

        console.log(personasArray);
        console.log("holi");
        return personasArray;


        //console.log(documentos);

   }


export async function findPersona(dni:Number) {
        const database = client.db('Vacunacion');
        const usuarios = database.collection('Pacientes');

        const query = { dni: dni };
        const doc = await usuarios.findOne(query);

        if(!doc){
          console.log("No encontrado")
          return null;
        }

        const persona = new Persona(doc.dni, doc.nombre, doc.apellido, doc.fecha_nacimiento, doc.sexo);
        persona.setAplicaciones=doc.aplicaciones;

        console.log(persona);
        return persona;

   }


   export async function deletePersona(dni: number) {

      const database = client.db('Vacunacion');
      const usuarios = database.collection('Pacientes');
      const query = { dni: dni };
      const result = await usuarios.findOneAndDelete(query);
      if (!result.value) {
        result.value = 404;
      }
      console.log(`DELETE`);
      return result.value;
}
