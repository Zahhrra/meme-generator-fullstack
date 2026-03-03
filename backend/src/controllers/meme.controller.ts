import { Request, Response } from "express";
import { memes, templates } from "../storage/meme.storage.js";
import { createMemeSchema } from "../validators/meme.validator.js";
import { Meme } from "../types/meme.types.js";
import { randomUUID } from "crypto";


export const getTemplates = (req: Request, res: Response) => {
  const allTemplates = Array.from(templates.values());
  res.json({
    templates: allTemplates,
    count: allTemplates.length,
  });
};


export const getMemes = (req: Request, res: Response) => {
  const allMemes = Array.from(memes.values());
  res.json({
    memes: allMemes,
    count: allMemes.length,
  });
};


export const getMemeById = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!memes.has(id)) {
    return res.status(404).json({ error: "Meme tapılmadı" });
  }

  res.json(memes.get(id));
};


export const getRandomMeme = (req: Request, res: Response) => {
  const all = Array.from(memes.values());

  if (all.length === 0) {
    return res.status(404).json({ error: "Heç bir meme yoxdur" });
  }

  const random = all[Math.floor(Math.random() * all.length)];
  res.json(random);
};


export const createMeme = (req: Request, res: Response) => {
  const validation = createMemeSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: validation.error.issues,
    });
  }

  const { templateId, topText, bottomText } = validation.data;

  const template = templates.get(templateId);

  if (!template) {
    return res.status(404).json({ error: "Template tapılmadı" });
  }

  const newMeme: Meme = {
    id: randomUUID(),
    topText,
    bottomText,
    imageUrl: template.imageUrl,
    positions: template.positions,
    createdAt: new Date(),
  };

  memes.set(newMeme.id, newMeme);

  return res.status(201).json(newMeme);
};

export const deleteMeme = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!memes.has(id)) {
    return res.status(404).json({ error: "Meme tapılmadı" });
  }

  memes.delete(id);
  res.json({ message: "Meme silindi" });
};
