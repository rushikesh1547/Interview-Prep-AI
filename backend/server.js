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
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));

//Middleware

app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

//Server upload folder - Note: For production, use cloud storage (AWS S3, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

//Start Server
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();