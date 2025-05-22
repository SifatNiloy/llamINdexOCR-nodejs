import { execFile } from "child_process";
import path from "path";

export const extractTextFromFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pythonScript = path.resolve(__dirname, "../../ocr.py");
    execFile("python", [pythonScript, filePath], (error, stdout, stderr) => {
      if (error) {
        console.error("Python OCR error:", stderr);
        return reject(error);
      }
      resolve(stdout.trim());
    });
  });
};
