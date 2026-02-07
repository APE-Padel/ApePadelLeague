import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes.js";
import mongoose from "mongoose";
import { ALLOWED_CLIENT_URLS } from "../constants.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();

const isLocal = () => !process.env.VERCEL

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

app.use(cors({
  origin: (origin, callback) => {
    // No-browser clients
    if (!origin) return callback(null, true);

    if (ALLOWED_CLIENT_URLS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Blocked by CORS"));
  },
  methods: ["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders: ["Content-Type","Authorization"]
}));


app.use(express.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", routes);
await connectDB();

if (isLocal()) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;