import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Configuration MongoDB
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("Erreur : MONGO_URI n'est pas défini dans le fichier .env");
  process.exit(1);
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

// Route pour l'inscription
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("Tous les champs sont requis.");
    }

    await client.connect();
    const db = client.db("budget_app");
    const usersCollection = db.collection("users");

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Un utilisateur avec cet email existe déjà.");
    }

    // Ajoutez l'utilisateur avec le champ createdAt
    const newUser = {
      username,
      email,
      password,
      createdAt: new Date(),
    };
    await usersCollection.insertOne(newUser);
    res.status(201).send("Utilisateur inscrit avec succès.");
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).send("Erreur interne du serveur.");
  } finally {
    await client.close();
  }
});

// Route pour la connexion
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Requête invalide : email ou mot de passe manquant.");
      return res.status(400).send("Email et mot de passe sont requis.");
    }

    await client.connect();
    const db = client.db("budget_app");
    const usersCollection = db.collection("users");

    // Vérifiez si l'utilisateur existe
    const user = await usersCollection.findOne({ email });
    if (!user) {
      console.log(`Email non trouvé en base de données : ${email}`);
      return res.status(401).send("Email non trouvé.");
    }

    // Vérifiez si le mot de passe est correct
    if (user.password !== password) {
      console.log(`Mot de passe incorrect pour l'email : ${email}`);
      return res.status(401).send("Mot de passe incorrect.");
    }

    console.log(`Connexion réussie pour l'email : ${email}`);
    res.status(200).send("Connexion réussie.");
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).send("Erreur interne du serveur.");
  } finally {
    await client.close();
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
