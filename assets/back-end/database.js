import dotenv from "dotenv"; // Charge les variables d'environnement
import mongoose from "mongoose";

dotenv.config(); // Configure dotenv

// Ajoutez cette ligne pour supprimer l'avertissement strictQuery
mongoose.set('strictQuery', true);

// Utilisez la chaîne de connexion depuis le fichier .env
const uri = process.env.MONGO_URI;

// Connexion à MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

export default mongoose;
