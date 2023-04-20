import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";  
import { Aplicacion } from "../clases/Aplicacion";
import { Persona } from "../clases/Persona";

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/Vacunacion";

const client = new MongoClient(url)


export async function findPersonas() {
    /*return new Promise<any>((resolve, reject)=>{
      const database = client.db('Vacunacion');
      const pacientes = database.collection('Pacientes');
    pacientes.find().toArray().then((documentos: { nombre: String; apellido: String; dni: Number; nacimiento: Date; sexo: String; aplicaciones: Aplicacion[]; }[])=>{
          console.log(documentos)
          resolve(documentos.map((doc: { nombre: String; apellido: String; dni: Number; nacimiento: Date; sexo:String; aplicaciones:Array<Aplicacion> }) => {
            const persona = new Persona(doc.dni, doc.nombre, doc.apellido, doc.nacimiento, doc.sexo);
            persona.setAplicaciones=doc.aplicaciones;
            return persona
          }));
      })
    })
    */
        
      const database = client.db('Vacunacion');
      const pacientes = database.collection('Pacientes');
        
      const documentos = await pacientes.find().toArray();
      const personasArray = documentos.map((doc: { nombre: String; apellido: String; dni: Number; nacimiento: Date; sexo:String; aplicaciones:Array<Aplicacion> }) => {
          const persona = new Persona(doc.dni, doc.nombre, doc.apellido, doc.nacimiento, doc.sexo);
          persona.setAplicaciones=doc.aplicaciones;
          return persona
        });
        
        return personasArray;
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

        const persona = new Persona(doc.dni, doc.nombre, doc.apellido, doc.nacimiento, doc.sexo);
        persona.setAplicaciones=doc.aplicaciones;

        return persona;

   }


   export async function deletePersona(dni: number) {

      const database = client.db('Vacunacion');
      const usuarios = database.collection('Pacientes');
      const query = { dni: dni };
      const result = await usuarios.findOneAndDelete(query);
      if (!result.value) {
        return 404;
      }
      else return 204;
      
}


export async function updatePersona(persona: Persona) {

  const database = client.db('Vacunacion');
  const usuarios = database.collection('Pacientes');
  const query = { dni: persona.getDni };
  const result = await usuarios.findOneAndReplace(query, JSON.parse(JSON.stringify(persona)));
  if (!result.value) {
    return 400;
  }
  else return 204;
}


export async function insertPersona(persona: Persona){
    const database = client.db('Vacunacion');
    const personas = database.collection('Pacientes');

    await personas.insertOne({
      dni: persona.getDni,
      nombre: persona.getNombre,
      apellido: persona.getApellido,
      nacimiento: persona.getNacimiento,
      sexo: persona.getSexo,
      aplicaciones: persona.getAplicaciones,
    });
}





//findPersonas();