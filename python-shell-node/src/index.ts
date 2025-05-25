import express from "express";
import cors from "cors";
import ocrRoutes from "./routes/ocrRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Mount router here (not multer)
app.use("/api/ocr", ocrRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
