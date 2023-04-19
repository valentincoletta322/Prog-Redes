import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";  

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/Vacunacion";

const client = new MongoClient(url)


export async function findVacunas() {


        const database = client.db('Vacunacion');

        const vacunas = database.collection('Vacunas');

        const result = vacunas.find();
        const documentos = await result.toArray();
        if (!result.value) {
          result.value = 404;
        }
        console.log(documentos);
        console.log(`FIND MANY`);
        return result.value;
   }


export async function findVacuna(id:Number) {

        const database = client.db('Vacunacion');

        const vacunas = database.collection('Vacunas');

        const query = { id: id };

        const result = await vacunas.findOne(query);
       
        if (!result.value) {
          result.value = 404;
        }

        console.log(result);
        console.log(`FIND ONE`);
        return result.value;

   }


   export async function deleteVacuna(id: number) {

      const database = client.db('Vacunacion');
      const vacunas = database.collection('Vacunas');
      const query = { id: id };
      const result = await vacunas.findOneAndDelete(query);
      if (!result.value) {
        result.value = 404;
      }
      console.log(`DELETE`);
      return result.value;
}
