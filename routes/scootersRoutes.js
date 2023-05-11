import express from "express";

import checkAuth from "../middleware/checkAuth.js";
import {
  createScooters,
  getScooters,
  getScooter,
  editScooter,
  deleteScooter,
  getScootersPrice,
} from "../controllers/scootersController.js";

const router = express.Router();

router.post("/", checkAuth, createScooters);
router.post("/filter", checkAuth, getScootersPrice);
router.get("/", checkAuth, getScooters);
router.get("/:id", checkAuth, getScooter);
router.put("/:id", checkAuth, editScooter);
router.delete("/:id", checkAuth, deleteScooter);

export default router;
