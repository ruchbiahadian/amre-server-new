import express from "express";
import { getAcara, updateAcara, acaraHapus, addAcara, activeAcara } from "../controllers/acara.js";

const router = express.Router()


router.get("/", getAcara)
router.get("/aktif", activeAcara)
router.put("/update", updateAcara)
router.post("/tambah", addAcara)
router.delete("/hapus/:id", acaraHapus)
export default router