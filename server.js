import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

const app = express();
app.use(express.json()); // Middleware pour traiter les requêtes JSON

// Configuration MongoDB
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("Erreur : MONGO_URI n'est pas défini dans le fichier .env");
  process.exit(1); // Arrête le serveur si l'URI est manquant
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
});

// Fonction pour vérifier la connexion MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connecté avec succès à MongoDB !");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
    throw err;
  }
}

// Route principale
app.get("/", async (req, res) => {
  try {
    await connectToMongoDB();
    res.send("Serveur connecté à MongoDB avec succès !");
  } catch (err) {
    res.status(500).send("Erreur de connexion à MongoDB");
  } finally {
    await client.close();
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
