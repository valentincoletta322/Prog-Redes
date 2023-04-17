
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/Vacunacion";

const client = new MongoClient(url)




export async function run() {

    try {

      const database = client.db('Vacunacion');

      const usuarios = database.collection('users');

      // Query for a movie that has the title 'Back to the Future'

      const query = { name: "Bill" };

      const usuario = await usuarios.findOne(query);

      console.log(usuario);

    } finally {

      // Ensures that the client will close when you finish/error

      await client.close();

    }

  }

  run().catch(console.dir);