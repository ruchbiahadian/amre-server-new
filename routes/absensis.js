import express from "express";
import { getPengajuan, absensiTerima, absensiTolak, getDisetujui, getDitolak, deleteAbsensi} from "../controllers/absensi.js";

const router = express.Router()


router.get("/getPengajuan", getPengajuan)
router.put("/absensiTerima", absensiTerima)
router.put("/absensiTolak", absensiTolak)
router.get("/getDisetujui", getDisetujui)
router.get("/getDitolak", getDitolak)
router.delete("/:id", deleteAbsensi)

export default router