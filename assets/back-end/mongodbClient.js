import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

const uri = process.env.MONGO_URI; // Utilisez la chaîne de connexion depuis le fichier .env

// Créez un MongoClient avec un objet MongoClientOptions pour définir la version Stable de l'API
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true, // Active explicitement TLS/SSL
});

async function run() {
  try {
    // Connecte le client au serveur
    await client.connect();
    // Envoie un ping pour confirmer une connexion réussie
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
  } finally {
    // Assure que le client se ferme lorsque vous avez terminé ou en cas d'erreur
    await client.close();
  }
}

run().catch(console.dir);

export default client;
