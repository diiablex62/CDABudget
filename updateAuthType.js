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

    const result = await usersCollection.updateMany(
      { authType: { $exists: false } }, 
      { $set: { authType: "password" } } 
    );

    console.log(`${result.modifiedCount} utilisateurs mis à jour.`);
  } catch (err) {
    console.error("Erreur lors de la mise à jour des utilisateurs :", err);
  } finally {
    await client.close();
  }
}

updateAuthType();
