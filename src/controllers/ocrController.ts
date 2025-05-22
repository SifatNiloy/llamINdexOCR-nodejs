import { Request, Response } from "express";
import { extractTextFromFile } from "../services/ocrService";
import fs from "fs";

export const ocrController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "File is required" });
      return;
    }

    const filePath = req.file.path;

    const text = await extractTextFromFile(filePath);

    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    res.json({ extractedText: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to extract text" });
  }
};
