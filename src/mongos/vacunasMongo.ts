import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";  
import { Vacuna } from "../clases/Vacuna";

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/Vacunacion";

const client = new MongoClient(url)


export async function findVacunas() {
        const database = client.db('Vacunacion');
        const vacunas = database.collection('Vacunas');

        const documentos = await vacunas.find().toArray();
        const vacunasArray = documentos.map((doc: { id: Number; descripcion: String; fabricantes: Array<String>; tipo:String; dosisRequeridas:Number }) => new Vacuna(doc.id, doc.descripcion, doc.fabricantes, doc.tipo, doc.dosisRequeridas));
        console.log(vacunasArray);
        return vacunasArray;
   }

export async function findVacuna(id:Number) {

        const database = client.db('Vacunacion');
        const vacunas = database.collection('Vacunas');

        const query = { id: id };
        const doc = await vacunas.findOne(query);
    
        if(!doc){
          console.log("No encontrado")
          return null;
        }
        
        const vacuna = new Vacuna(doc.id, doc.descripcion, doc.fabricantes, doc.tipo, doc.dosisRequeridas);
        console.log(vacuna);

        return vacuna;
   }


   export async function deleteVacuna(id: number) {

      const database = client.db('Vacunacion');
      const vacunas = database.collection('Vacunas');
      const query = { id: id };
      const result = await vacunas.findOneAndDelete(query);
      if (!result.value) {
        return 400;
      }
      return 204;
}

export async function insertVacunas(vacuna: Vacuna){
  const database = client.db('Vacunacion');
  const personas = database.collection('Vacunas');

  await personas.insertOne({
    id: vacuna.getId,
    descripcion: vacuna.getDescripcion,
    fabricantes: vacuna.getFabricantes,
    tipo: vacuna.getTipo,
    dosisRequeridas: vacuna.getDosisRequeridas,
  });
}

export async function updateVacuna(vacuna: Vacuna) {

  const database = client.db('Vacunacion');
  const vacunas = database.collection('Vacunas');
  const query = { id: vacuna.getId };
  const result = await vacunas.findOneAndReplace(query, JSON.parse(JSON.stringify(vacuna)));
  if (!result.value) {
    return 404;
  }
  else return 204;
  
}