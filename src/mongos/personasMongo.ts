import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";  

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

   }


export async function findPersona(dni:Number) {

        const database = client.db('Vacunacion');

        const personas = database.collection('Pacientes');

        const query = { dni: dni };

        const cursor = await personas.findOne(query);
        //const documentos = await cursor.toArray();

        console.log(cursor);

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