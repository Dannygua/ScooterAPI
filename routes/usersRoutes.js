import express from "express";
import {
  login,
  registerAdmin,
  registerClients,
} from "../controllers/usersController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/clients", registerClients);
router.post("/admins", checkAuth, registerAdmin);
router.post("/login", login);

export default router;
