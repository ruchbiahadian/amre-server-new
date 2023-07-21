import express from "express";
import { getAcara, updateAcara, acaraHapus } from "../controllers/acara.js";

const router = express.Router()


router.get("/", getAcara)
router.put("/update", updateAcara)
// router.post("/tambah", jenisReimsTambah)
router.delete("/hapus/:id", acaraHapus)
export default router