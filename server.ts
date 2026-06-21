import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Path to persistent db file in the workspace
const DB_PATH = path.join(process.cwd(), "src", "db.json");

// Helper function to read the db
function readDB() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading database file:", err);
  }
  // Fallback to minimal mock if there is an error
  return {
    projects: [],
    diplomas: [],
    attestations: [],
    media: [],
    testimonials: [],
    messages: [],
    settings: {
      name: "TRAORÉ JOSEPH KASSIRI STÉPHANE",
      title: "Soudeur Qualifié & Spécialiste en Construction Métallique",
      email: "traorejosephinbox@gmail.com",
      phone: "+225 07 48 89 23 45",
      whatsapp: "2250748892345",
      address: "Abidjan, Côte d'Ivoire",
      cvUrl: "#",
      avatarUrl: "",
      aboutMe: "",
      values: [],
      objectives: "",
      stats: { experienceYears: 8, completedProjects: 45, certificationsCount: 6, satisfactionRate: 100 }
    }
  };
}

// Helper to write changes to db
function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing database file:", err);
    return false;
  }
}

// Expose dynamic API Endpoint to get the entire portfolio
app.get("/api/portfolio", (req, res) => {
  const db = readDB();
  res.json(db);
});

// Update Site Settings
app.post("/api/settings", (req, res) => {
  const db = readDB();
  db.settings = { ...db.settings, ...req.body };
  writeDB(db);
  res.json({ success: true, settings: db.settings });
});

// Project CRUD
app.post("/api/projects", (req, res) => {
  const db = readDB();
  const project = {
    id: req.body.id || `proj-${Date.now()}`,
    title: req.body.title || "Sans titre",
    description: req.body.description || "",
    category: req.body.category || "Autre",
    techniques: Array.isArray(req.body.techniques) ? req.body.techniques : [],
    materials: Array.isArray(req.body.materials) ? req.body.materials : [],
    imageUrl: req.body.imageUrl || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    date: req.body.date || new Date().getFullYear().toString()
  };

  const existingIdx = db.projects.findIndex((p: any) => p.id === project.id);
  if (existingIdx > -1) {
    db.projects[existingIdx] = project;
  } else {
    db.projects.push(project);
  }

  writeDB(db);
  res.json({ success: true, project });
});

app.delete("/api/projects/:id", (req, res) => {
  const db = readDB();
  const originalLength = db.projects.length;
  db.projects = db.projects.filter((p: any) => p.id !== req.params.id);
  writeDB(db);
  res.json({ success: db.projects.length < originalLength });
});

// Diplomas CRUD
app.post("/api/diplomas", (req, res) => {
  const db = readDB();
  const diploma = {
    id: req.body.id || `dip-${Date.now()}`,
    title: req.body.title || "Nouvelle certification",
    issuer: req.body.issuer || "Inconnu",
    year: req.body.year || new Date().getFullYear().toString(),
    imageUrl: req.body.imageUrl || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
    standard: req.body.standard || ""
  };

  const existingIdx = db.diplomas.findIndex((d: any) => d.id === diploma.id);
  if (existingIdx > -1) {
    db.diplomas[existingIdx] = diploma;
  } else {
    db.diplomas.push(diploma);
  }

  writeDB(db);
  res.json({ success: true, diploma });
});

app.delete("/api/diplomas/:id", (req, res) => {
  const db = readDB();
  db.diplomas = db.diplomas.filter((d: any) => d.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// Attestations CRUD
app.post("/api/attestations", (req, res) => {
  const db = readDB();
  const attestation = {
    id: req.body.id || `att-${Date.now()}`,
    title: req.body.title || "Nouvelle Attestation",
    company: req.body.company || "",
    description: req.body.description || "",
    year: req.body.year || new Date().getFullYear().toString()
  };

  const existingIdx = db.attestations.findIndex((a: any) => a.id === attestation.id);
  if (existingIdx > -1) {
    db.attestations[existingIdx] = attestation;
  } else {
    db.attestations.push(attestation);
  }

  writeDB(db);
  res.json({ success: true, attestation });
});

app.delete("/api/attestations/:id", (req, res) => {
  const db = readDB();
  db.attestations = db.attestations.filter((a: any) => a.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// Media CRUD
app.post("/api/media", (req, res) => {
  const db = readDB();
  const mediaItem = {
    id: req.body.id || `med-${Date.now()}`,
    title: req.body.title || "",
    type: req.body.type || "photo",
    url: req.body.url || "",
    videoPlatform: req.body.videoPlatform || "mp4",
    category: req.body.category || "Général"
  };

  const existingIdx = db.media.findIndex((m: any) => m.id === mediaItem.id);
  if (existingIdx > -1) {
    db.media[existingIdx] = mediaItem;
  } else {
    db.media.push(mediaItem);
  }

  writeDB(db);
  res.json({ success: true, mediaItem });
});

app.delete("/api/media/:id", (req, res) => {
  const db = readDB();
  db.media = db.media.filter((m: any) => m.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// Testimonials Client CRUD
app.post("/api/testimonials", (req, res) => {
  const db = readDB();
  const testimonial = {
    id: req.body.id || `test-${Date.now()}`,
    name: req.body.name || "Client Anonyme",
    company: req.body.company || "",
    role: req.body.role || "Professionnel",
    content: req.body.content || "",
    rating: typeof req.body.rating === "number" ? req.body.rating : 5,
    date: req.body.date || new Date().toISOString().substring(0, 10),
    approved: req.body.approved !== undefined ? req.body.approved : true
  };

  const existingIdx = db.testimonials.findIndex((t: any) => t.id === testimonial.id);
  if (existingIdx > -1) {
    db.testimonials[existingIdx] = testimonial;
  } else {
    db.testimonials.push(testimonial);
  }

  writeDB(db);
  res.json({ success: true, testimonial });
});

app.delete("/api/testimonials/:id", (req, res) => {
  const db = readDB();
  db.testimonials = db.testimonials.filter((t: any) => t.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// Contact Messages Submission
app.post("/api/messages", (req, res) => {
  const db = readDB();
  const message = {
    id: `msg-${Date.now()}`,
    name: req.body.name || "Visiteur",
    email: req.body.email || "",
    phone: req.body.phone || "",
    subject: req.body.subject || "Aucun objet",
    message: req.body.message || "",
    date: new Date().toISOString(),
    read: false
  };

  db.messages.push(message);
  writeDB(db);
  res.json({ success: true, message });
});

// Mark Message as Read / Delete Message
app.patch("/api/messages/:id/read", (req, res) => {
  const db = readDB();
  const msg = db.messages.find((m: any) => m.id === req.params.id);
  if (msg) {
    msg.read = true;
    writeDB(db);
    res.json({ success: true, message: msg });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

app.delete("/api/messages/:id", (req, res) => {
  const db = readDB();
  db.messages = db.messages.filter((m: any) => m.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// GEMINI AI INTEGRATION: Intelligent Welding/Metallurgy Advisor proxy
app.post("/api/gemini/advisor", async (req, res) => {
  const { question, history } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question vide" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return res.json({
      reply: "⚠️ *Note de l'assistant* : La clé d'API Gemini n'est pas encore configurée dans le panneau de secrets. Cependant, en tant que consultant en soudure, je vous conseille de toujours vérifier l'adhérence mécanique et le préchauffage des aciers spéciaux !"
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = 
      "Tu es l'Expert-Conseil en Métallurgie et Directeur Technique Virtuel de TRAORÉ JOSEPH KASSIRI STÉPHANE, soudeur d'élite qualifié (certifié Bureau Veritas ISO 9606-1). " +
      "Ton rôle est d'expliquer chaleureusement et de manière très technique et rigoureuse les techniques de soudage (procédés 111-SMAW, 141-TIG, 135-MAG, piquage de tubes, DMOS), les spécifications de métaux (Aciers carbone, aciers de nuance S355, Inox 304L/316L, contraintes thermiques, gaz de protection argon, etc.), " +
      "et d'inciter fortement les recruteurs, clients et entreprises industrielles à collaborer avec Stéphane. " +
      "Réponds en français fluide, professionnel, valorisant, moderne et bien structuré avec des puces élégantes ou formules professionnelles.";

    // Simple chat generation with system instruction passed in config
    const contextHistory = Array.isArray(history) ? history : [];
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    // Populate history if needed, or simply pass the questions
    const response = await chat.sendMessage({ message: question });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini Advisor Proxy Error:", error);
    res.status(500).json({ error: "Erreur de traitement AI", details: error.message });
  }
});

// Setup Vite Dev server or Serve static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
