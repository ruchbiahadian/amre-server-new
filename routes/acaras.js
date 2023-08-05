import express from "express";
import { getAcara, updateAcara, acaraHapus, addAcara, activeAcara, activeAcaraAbsence, nonActiveAcara, nonActiveAcaraAbsence } from "../controllers/acara.js";

const router = express.Router()


router.get("/", getAcara)
router.get("/aktif", activeAcara)
router.get("/nonaktif", nonActiveAcara)
router.get("/aktifAbsen", activeAcaraAbsence)
router.get("/nonaktifAbsen", nonActiveAcaraAbsence)
router.put("/update", updateAcara)
router.post("/tambah", addAcara)
router.delete("/hapus/:id", acaraHapus)
export default router