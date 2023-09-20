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
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

//controllers
import { register } from "./controllers/auth.js";
import { createProduct } from "./controllers/product.js";

//tokens
import { verifyAdminToken } from "./middleware/admin.js";
import Product from "./models/productModel.js";
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
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//routes with files
app.post(
  "/products/new",
  verifyAdminToken,
  upload.array("picture"),
  createProduct
);
app.post("/auth/register", upload.single("picture"), register);

//routes
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
// app.get("/e", (req, res) => {
//   res.json({
//     name: " Another Enjamuri Sagar",
//   });
// });

// app.post("/ssa", verifyAdminToken, async (req, res) => {
//   try {
//     res.json({
//       msg: "Access Accepted",
//     });
//   } catch (error) {
//     res.json({
//       msg: "Access denied",
//     });
//   }
// });
