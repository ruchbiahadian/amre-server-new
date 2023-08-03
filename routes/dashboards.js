import express from "express";
import { getReim, getAbsen, getReimAdmin, getAbsenAdmin } from "../controllers/dashboard.js";

const router = express.Router()


router.get("/getReim/:id", getReim)
router.get("/getAbsen/:id", getAbsen)
router.get("/getReimAdmin/", getReimAdmin)
router.get("/getAbsenAdmin/", getAbsenAdmin)


export default router