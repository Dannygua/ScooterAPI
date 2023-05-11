import express from "express";
import conectarDB from "./config/bd.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/usersRoutes.js";
import scooterRoutes from "./routes/scootersRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

conectarDB();

// const whitelist = [process.env.FRONTEND_URL];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Error de Cors"));
//     }
//   },
// };

// app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/scooters", scooterRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
