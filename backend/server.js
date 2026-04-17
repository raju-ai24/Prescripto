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
app.use(express.static('public'));

// connect to DB + Cloudinary
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());

// ✅ CORS Configuration (fixed: include 'token' in allowedHeaders)
const allowedOrigins = [
  "http://localhost:5173",  // frontend
  "http://localhost:5174",  // admin
  process.env.FRONTEND_URL || "https://prescripto-hospital-management-system.onrender.com", // production frontend
  process.env.ADMIN_URL || "https://prescripto-admin.onrender.com" // production admin
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token", "atoken", "dtoken"], // ✅ added 'token', 'atoken', and 'dtoken'
  credentials: true,
}));

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));
