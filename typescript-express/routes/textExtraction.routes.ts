import { Router } from "express";
import upload from "../middleware/upload";
import { extractTextController } from "../controllers/textExtraction.controller";

const router = Router();

router.post("/extract-text", upload.single("file"), extractTextController);

export default router;
