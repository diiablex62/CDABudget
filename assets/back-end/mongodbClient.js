import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); 

const uri = process.env.MONGO_URI; 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Connecté avec succès à MongoDB!"
    );
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

export default client;