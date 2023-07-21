import express from "express";
import { getJenis, jenisReimsHapus, jenisReimsTambah } from "../controllers/jenisReims.js";

const router = express.Router()


router.get("/", getJenis)
router.post("/tambah", jenisReimsTambah)
router.delete("/hapus/:id", jenisReimsHapus)
export default router