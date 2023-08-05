import multer from "multer";
import express from "express";
import { compareImages, getInvoicePic } from "../controllers/invoiceComparison.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.any(), compareImages);
router.get("/:acaraId", getInvoicePic);

export default router;
