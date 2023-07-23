import express from "express";
import { getReim, addReim, deleteReim, updateReim, getPengajuan, reimTerima, reimTolak, getDitolak, getDisetujui, checkReim } from "../controllers/reimbursement.js";

const router = express.Router()


router.get("/find/:userId", getReim)
router.get("/checkReim/:acaraId", checkReim)
router.get("/getPengajuan", getPengajuan)
router.get("/getDisetujui", getDisetujui)
router.get("/getDitolak", getDitolak)
router.post("/add", addReim)
router.delete("/:id", deleteReim)
router.put("/update", updateReim)
router.put("/reimTerima", reimTerima)
router.put("/reimTolak", reimTolak)
export default router