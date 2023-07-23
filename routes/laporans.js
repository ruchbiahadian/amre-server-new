import express from "express";
import { getLaporan } from "../controllers/laporan.js";

const router = express.Router()


router.get("/:acaraId", getLaporan)
export default router