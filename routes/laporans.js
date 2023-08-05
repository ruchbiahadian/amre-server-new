import express from "express";
import { getLaporan, getTotalReim, getAbsen } from "../controllers/laporan.js";

const router = express.Router()


router.get("/reim/:acaraId", getLaporan)
router.get("/absen/:acaraId", getAbsen)
router.get("/total/:acaraId", getTotalReim)
export default router