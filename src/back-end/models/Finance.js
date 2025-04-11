import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["revenue", "expense"], required: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  past: { type: Number, default: 0 },
  upcoming: { type: Number, default: 0 },
  year: { type: Number, required: true }, // Année
  month: { type: Number, required: true }, // Mois
  date: { type: Date, default: Date.now },
});

// Hook pour loguer lors de la création d'un document
financeSchema.post("save", function (doc) {
  console.log("Hook 'save' appelé. Document Finance créé :", doc);
  if (doc.name === "Salaire mensuel") {
    console.log("Valeur détectée dans le hook 'save' : Salaire mensuel");
  }
});

// Hook pour loguer lors de la mise à jour d'un document
financeSchema.post("findOneAndUpdate", function (doc) {
  console.log(
    "Hook 'findOneAndUpdate' appelé. Document Finance mis à jour :",
    doc
  );
  if (doc.name === "Salaire mensuel") {
    console.log(
      "Valeur détectée dans le hook 'findOneAndUpdate' : Salaire mensuel"
    );
  }
});

// Hook pour loguer lors de la suppression d'un document
financeSchema.post("findOneAndDelete", function (doc) {
  console.log(
    "Hook 'findOneAndDelete' appelé. Document Finance supprimé :",
    doc
  );
  if (doc.name === "Salaire mensuel") {
    console.log(
      "Valeur détectée dans le hook 'findOneAndDelete' : Salaire mensuel"
    );
  }
});

export default mongoose.model("Finance", financeSchema);
