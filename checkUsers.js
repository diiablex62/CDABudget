import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function createUser() {
  try {
    await client.connect();
    const db = client.db("budget_app");
    const usersCollection = db.collection("users");

    // Créez un utilisateur
    const newUser = {
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    console.log("Utilisateur créé avec succès :", result.insertedId);
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur :", err);
  } finally {
    await client.close();
  }
}

createUser();
