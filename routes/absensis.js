import express from "express";
import { getPengajuan, absensiTerima, absensiTolak, getDisetujui, getDitolak, deleteAbsensi, getAbsen, addAbsen, updateAbsen, checkAbsen} from "../controllers/absensi.js";

const router = express.Router()


router.get("/find/:userId", getAbsen)
router.get("/checkAbsen/:acaraId", checkAbsen)
router.get("/getPengajuan", getPengajuan)
router.put("/absensiTerima", absensiTerima)
router.put("/absensiTolak", absensiTolak)
router.get("/getDisetujui", getDisetujui)
router.get("/getDitolak", getDitolak)
router.delete("/:id", deleteAbsensi)
router.post("/addAbsen", addAbsen)
router.put("/update", updateAbsen)

export default router