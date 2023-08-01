import express from "express";
import { getPendaftar, hapusPendaftar, terimaPendaftar, getDaftarAkun, hapusDaftarAkun, resetPassword, addAdmin, getDaftarAdmin } from "../controllers/akun.js";

const router = express.Router()


router.get("/getPendaftar", getPendaftar)
router.delete("/hapusPendaftar/:id", hapusPendaftar)
router.delete("/hapusDaftarAkun/:id", hapusDaftarAkun)
router.post("/terimaPendaftar", terimaPendaftar)
router.get("/getDaftarAkun", getDaftarAkun)
router.put("/resetPassword", resetPassword)
router.post("/tambahAdmin", addAdmin)
router.get("/getDaftarAdmin", getDaftarAdmin)


export default router