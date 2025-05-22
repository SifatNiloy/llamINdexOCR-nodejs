import { Request, Response } from "express";
import { extractTextFromFile } from "../services/ocrService";
import fs from "fs";

export const ocrController = async (req: Request, res: Response): Promise<void> => {
  let filePath = "";

  try {
    if (!req.file) {
      res.status(400).json({ error: "File is required" });
      return;
    }

    filePath = req.file.path;
    const text = await extractTextFromFile(filePath);

    res.json({ extractedText: text });
  } catch (error) {
    console.error("OCR Error:", error);
    res.status(500).json({ error: "Failed to extract text" });
  } finally {
    // Always try to delete the file if it exists
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("❌ Failed to delete uploaded file:", err);
        else console.log("🗑️ Uploaded file deleted:", filePath);
      });
    }
  }
};
