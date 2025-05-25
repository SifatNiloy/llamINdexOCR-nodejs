import { Request, Response } from "express";
import fs from "fs";
import { extractTextFromDocument } from "../helpers/textExtraction.helper";

export const extractTextController = async (req: Request, res: Response): Promise<void> => {
  let filePath = "";

  try {
    if (!req.file) {
      res.status(400).json({ error: "File is required" });
      return;
    }

    filePath = req.file.path;
    const text = await extractTextFromDocument(filePath);

    res.json({ extractedText: text });
  } catch (error) {
    console.error("Text extraction error:", error);
    res.status(500).json({ error: "Failed to extract text" });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("❌ Failed to delete file:", err);
        else console.log("🗑️ File deleted:", filePath);
      });
    }
  }
};
