import { Router } from "express";
import upload from "../middleware/upload";
import { ocrController } from "../controllers/ocrController";

const router = Router();

router.post("/extract-text", upload.single("file"), ocrController);

export default router;
