import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";  
import { Persona } from "../clases/Persona";
import { Aplicacion } from "../clases/Aplicacion";

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/Vacunacion";

const client = new MongoClient(url)


export async function findPersonas() {


        const database = client.db('Vacunacion');

        const personas = database.collection('Pacientes');

        // Query for a movie that has the title 'Back to the Future'

        // const query = { dni: dni };

        const cursor = personas.find();
        const documentos = await cursor.toArray();

        console.log(documentos);
        const personasArray = documentos.map((doc: { nombre: String; apellido: String; dni: Number; fecha_nacimiento: Date; sexo:String; aplicaciones:Array<Aplicacion> }) => new Persona(doc.dni, doc.nombre, doc.apellido, doc.fecha_nacimiento, doc.sexo).setAplicaciones=doc.aplicaciones);

        console.log(personasArray);
        return personasArray;

   }


export async function findPersona(dni:Number) {

        const database = client.db('Vacunacion');

        const personas = database.collection('Pacientes');

        const query = { dni: dni };

        const cursor = await personas.findOne(query);

        const persona = new Persona(cursor.id, cursor.nombre, cursor.apellido, cursor.fecha_nacimiento, cursor.sexo);
        //const documentos = await cursor.toArray();
        console.log(persona);

        return persona;

   }


   export async function deletePersona(dni: number) {

      const database = client.db('Vacunacion');
      const personas = database.collection('Pacientes');
      const query = { dni: dni };
      const result = await personas.findOneAndDelete(query);
      if (!result.value) {
        result.value = 404;
      }
      console.log(`DELETE`);
      return result.value;
}


findPersonas();