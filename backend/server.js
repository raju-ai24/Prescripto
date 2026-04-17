import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// ✅ CORS Configuration
app.use(cors({
  origin: ["https://prescripto-frontend-g05d.onrender.com", "http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token", "atoken", "dtoken"],
}));

// connect to DB + Cloudinary
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(express.static('public'));

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// CORS test endpoint
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS test successful", origin: req.headers.origin });
});

// Start server
app.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));
