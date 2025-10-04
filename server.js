import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 3001;

const allowedOrigins = [
  "http://localhost:3000", // your local frontend
  "https://your-frontend-app.onrender.com", // your deployed frontend
];



// ✅ allow all origins during dev
// app.use(cors({
//   origin: true, // Reflects request origin automatically
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(express.json());

// 🔥 replace with your actual backend API
const API_BASE = "http://email-list-api-3.onrender.com";

// proxy register
app.post("/api/auth/register", async (req, res) => {
  try {
    const response = await axios.post(`${API_BASE}/api/auth/register`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Proxy error" });
  }
});

// proxy login
app.post("/api/auth/login", async (req, res) => {
  try {
    const response = await axios.post(`${API_BASE}/api/auth/login`, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Proxy error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
