import express from "express";
import client from "./mongodbClient.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    res.send("Serveur connecté à MongoDB avec succès !");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
    res.status(500).send("Erreur de connexion à MongoDB");
  } finally {
    await client.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
