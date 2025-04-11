import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function createFinance() {
  try {
    await client.connect();
    const db = client.db("budget_app");
    const financesCollection = db.collection("finances");

    // Créez une donnée de finance
    const newFinance = {
      userId: "64a7f2b8e4b0f5c3d2e1a123", // Remplacez par un ID utilisateur valide
      type: "revenue",
      category: "Salaire",
      name: "Salaire mensuel",
      past: 2000,
      upcoming: 0,
      date: new Date(),
    };

    const result = await financesCollection.insertOne(newFinance);
    console.log("Donnée de finance créée avec succès :", result.insertedId);
  } catch (err) {
    console.error("Erreur lors de la création de la donnée de finance :", err);
  } finally {
    await client.close();
  }
}

createFinance();
