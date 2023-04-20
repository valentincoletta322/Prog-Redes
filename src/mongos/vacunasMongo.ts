import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";  
import { Vacuna } from "../clases/Vacuna";

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/Vacunacion";

const client = new MongoClient(url)


export async function findVacunas() {


        const database = client.db('Vacunacion');

        const vacunas = database.collection('Vacunas');

        const result = vacunas.find();
        const documentos = await result.toArray();
        console.log(documentos);
        const vacunasArray = documentos.map((doc: { id: Number; descripcion: String; fabricantes: Array<String>; tipo:String; dosisRequeridas:Number }) => new Vacuna(doc.id, doc.descripcion, doc.fabricantes, doc.tipo, doc.dosisRequeridas));

        console.log(vacunasArray);
        return vacunasArray;
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
