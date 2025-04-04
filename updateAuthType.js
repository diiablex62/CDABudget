import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function updateAuthType() {
  try {
    await client.connect();
    const db = client.db("budget_app");
    const usersCollection = db.collection("users");

    // Ajoute le champ authType avec une valeur par défaut "password" pour les utilisateurs existants
    const result = await usersCollection.updateMany(
      { authType: { $exists: false } }, // Filtre les utilisateurs sans authType
      { $set: { authType: "password" } } // Ajoute authType avec la valeur "password"
    );

    console.log(`${result.modifiedCount} utilisateurs mis à jour.`);
  } catch (err) {
    console.error("Erreur lors de la mise à jour des utilisateurs :", err);
  } finally {
    await client.close();
  }
}

updateAuthType();
