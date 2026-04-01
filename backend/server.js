require("dotenv").config();
const express = require("express"); 
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const {protect} = require("./middlewares/authMiddleware");

const {
  generateInterviewQuestions,
  generateConceptExplanation
} = require("./controllers/aiController");
const app = express();

//Middleware to handle CORS
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }

        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:3000",
            "https://interview-prep-ai-751t.vercel.app",  // Production frontend
            "https://interview-prep-ai-git-master-rushikesh1547s-projects.vercel.app",
            process.env.FRONTEND_URL,  // From environment variable
        ].filter(Boolean);

        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            console.error(`CORS blocked origin: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "x-forwarded-proto", "x-forwarded-host"],
    credentials: true
};

app.use(cors(corsOptions));

//Middleware

app.use(express.json());

// Connect to DB on each request BEFORE routes (uses cached connection in serverless)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Database connection failed:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
});

app.get("/", (req, res) => {
    res.send("API is running....");
});

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

//Server upload folder - Note: For production, use cloud storage (AWS S3, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

//Start Server (for local development)
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

// Export for Vercel serverless
module.exports = app;