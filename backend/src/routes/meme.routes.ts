import { Router } from "express";
import {
  getTemplates,
  getMemes,
  getMemeById,
  createMeme,
  getRandomMeme,
  deleteMeme,
} from "../controllers/meme.controller.js";

const router = Router();

// Template routes
router.get("/templates", getTemplates);

// Meme routes
router.get("/memes", getMemes);
router.get("/memes/random", getRandomMeme);
router.get("/memes/:id", getMemeById);
router.post("/memes", createMeme);
router.delete("/memes/:id", deleteMeme);

export default router;
