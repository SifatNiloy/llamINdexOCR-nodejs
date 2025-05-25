
import { PDFReader } from "@llamaindex/readers/pdf";
import { Document } from "llamaindex";
import fs from "fs";
import PdfParse from "pdf-parse";

export const extractTextFromDocument = async (filePath: string): Promise<string> => {
  try {
    const reader = new PDFReader();
    const documents: Document[] = await reader.loadData(filePath);
    return documents.map(doc => doc.text).join("\n");
  } catch (err) {
    console.error("Error extracting text:", err);
    throw new Error("Text extraction failed");
  }
};


// Checking if Bangla is detected 
// const containsBangla = (text: string): boolean => /[\u0980-\u09FF]/.test(text);
