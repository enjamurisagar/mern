import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
//routes import
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

//controllers
import { register } from "./controllers/auth.js";
// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url); //we include this only when we use type:"module" in package.json
const __dirname = path.dirname(__filename); //we include this only when we use type:"module" in package.json

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //setting the assets in public folder

//FILE STORAGE

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//routes with files
app.post("/auth/register", upload.single("picture"), register);

//routes
// app.use(userRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

//mongo connection

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => console.log("server running on 5000"))
  )
  .catch((err) =>
    console.log("COnnection  failed with mongodb => " + err.message)
  );

app.get("/", (req, res) => {
  res.json({
    name: "Enjamuri Sagar",
  });
});
app.get("/e", (req, res) => {
  res.json({
    name: " Another Enjamuri Sagar",
  });
});
