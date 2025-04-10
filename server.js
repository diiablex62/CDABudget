import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("Error: MONGO_URI is not defined in the .env file");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongoDB() {
  if (!client.isConnected) {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  }
}

const getUsersCollection = async () => {
  await connectToMongoDB();
  return client.db("budget_app").collection("users");
};

app.get("/", async (req, res) => {
  try {
    await connectToMongoDB();
    res.send("Server connected to MongoDB successfully!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    res.status(500).send("Error connecting to MongoDB");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const usersCollection = await getUsersCollection();
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "A user with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword,
      authType: "password",
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Email not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    console.log(`Successful login for email: ${email}`);
    res.status(200).json({
      message: "Login successful.",
      username: user.username,
      authType: user.authType,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

const CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;
const googleClient = new OAuth2Client(CLIENT_ID);

app.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    const usersCollection = await getUsersCollection();
    let user = await usersCollection.findOne({ email });
    if (!user) {
      user = {
        username: name,
        email,
        authType: "google",
        createdAt: new Date(),
      };
      await usersCollection.insertOne(user);
    }

    res.status(200).json({
      success: true,
      message: "Connexion réussie.",
      user: { username: user.username, authType: user.authType },
    });
  } catch (err) {
    console.error("Error during Google token validation:", err);
    res
      .status(500)
      .json({ success: false, error: "Erreur interne du serveur." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
